import asyncpg
from aiohttp.web import Application, AppKey
from dataclasses import dataclass
from typing import Protocol, Iterable
from enum import Enum
from exceptions import DBError
from config import DB_USER, DB_USER_PASS, DB_NAME

db_key = AppKey('db_key')

@dataclass(slots=True, frozen=True)
class AdminRecord:
    username: str
    password: str
    is_admin: bool

class AdminFields(str, Enum):
    username = 'username'
    password = 'password'

class Database(Protocol):
    def auth_admin(self, record: AdminRecord) -> None:
        raise NotImplementedError
    
    def get_admins(self, record: AdminRecord) -> None:
        raise NotImplementedError
    
    def new_admin(self, record: AdminRecord) -> None:
        raise NotImplementedError
    
    def get_intentions(self, record: AdminRecord) -> None:
        raise NotImplementedError
    
    def new_intention(self, record: AdminRecord) -> None:
        raise NotImplementedError


class PGDatabase:
    def __init__(self) -> None:
        self.con = None

    async def connect(self, db_user: str, db_user_pass: str, db_name: str) -> None:
        self.con = await asyncpg.connect(
            user=db_user,
            password=db_user_pass,
            database=db_name
        )

    async def auth_admin(self, record: AdminRecord) -> bool:
        if not self.con: raise DBError
        data = await self.con.fetch(
            'SELECT admin_password from admins WHERE admin_login=$1',
            record.username)

        if not data: raise DBError
        if data[0]['admin_password'] == record.password:
            return True

        return False
    
    async def get_admins(self) -> Iterable[AdminRecord]:
        if not self.con: raise DBError
        data = await self.con.fetch('SELECT (admin_login,is_admin) FROM admins')
        if not data: raise DBError
        response = []

        for row in data:
            admin = AdminRecord(username=row['admin_login'],
                                 is_admin=data['is_admin'])
            response.append(admin)
        return response

async def create_db(db_user: str, db_user_pass: str, db_name: str) -> Database:
    db = PGDatabase()
    await db.connect(db_user=db_user, db_user_pass=db_user_pass,db_name=db_name)
    return db

async def add_db_to_context(app: Application) -> None:
    app[db_key] = await create_db(
        db_user=DB_USER,
        db_user_pass=DB_USER_PASS,
        db_name=DB_NAME)