import asyncpg
import json
from aiohttp.web import Application, AppKey
from dataclasses import dataclass, asdict
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

@dataclass(slots=True, frozen=True)
class IntentionRecord:
    intention: str
    keywords: Iterable[str]

class RecordEncoder(json.JSONEncoder):
    def default(self,o):
        return asdict(o)

class AdminFields(str, Enum):
    username = 'username'
    password = 'password'

class Database(Protocol):
    def auth_admin(self, record: AdminRecord) -> None:
        raise NotImplementedError

    def get_admins(self) -> None:
        raise NotImplementedError

    def new_admin(self, record: AdminRecord) -> None:
        raise NotImplementedError

    def get_intentions(self) -> None:
        raise NotImplementedError

    def new_intention(self,) -> None:
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

    async def auth_admin(self, record: AdminRecord) -> tuple(bool,bool):
        if not self.con: raise DBError
        data = await self.con.fetch(
            'SELECT (admin_password, is_admin) from admins WHERE admin_login=$1',
            record.username)

        if not data: raise DBError
        if data[0]['admin_password'] == record.password:
            return (True,data[0]['is_admin'])

        return (False,False)

    async def get_admins(self) -> Iterable[AdminRecord]:
        if not self.con: raise DBError
        data = await self.con.fetch('SELECT (admin_login,is_admin) FROM admins')
        if not data: raise DBError
        response = []

        for row in data:
            admin = AdminRecord(username=row[0][0],
                                 is_admin=row[0][1],
                                password=None)
            response.append(json.dumps(admin, cls=RecordEncoder))
        return response

    async def get_intentions(self) -> Iterable[IntentionRecord]:
        if not self.con: raise DBError
        data = await self.con.fetch('''select intention, keyw from intentions right join
                              keywords on intentions.keyword_id = keywords.id;''')
        if not data: raise DBError
        response = []
        for i in range(len(data)):
            intent_text = data[i]['intention']
            keywords = []
            for value in data[i]['keyw']:
                keywords.append(value)
            intention = IntentionRecord(intention=intent_text,
                                        keywords=keywords)
            response.append(json.dumps(intention, cls=RecordEncoder,
                                       ensure_ascii=False))
        return response

    async def new_intention(self, record: IntentionRecord) -> None:
        if not self.con: raise DBError
        try:
            id = await self.con.fetchrow(
                '''INSERT INTO keywords (keyw) VALUES ($1) RETURNING id''',
                record.keywords
            )
            await self.con.execute(
                '''INSERT INTO intentions (intention, keyword_id) VALUES ($1, $2)''',
                record.intention, id[0]            
            )
        except Exception as e:
            print(e)

async def create_db(db_user: str, db_user_pass: str, db_name: str) -> Database:
    db = PGDatabase()
    await db.connect(db_user=db_user, db_user_pass=db_user_pass,db_name=db_name)
    return db

async def add_db_to_context(app: Application) -> None:
    app[db_key] = await create_db(
        db_user=DB_USER,
        db_user_pass=DB_USER_PASS,
        db_name=DB_NAME)