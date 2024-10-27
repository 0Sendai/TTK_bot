import asyncpg
import json
from aiohttp.web import Application, AppKey
from dataclasses import dataclass, asdict
from typing import Protocol, Iterable
from enum import Enum
from back.exceptions import DBError
from back.config import DB_USER, DB_USER_PASS, DB_NAME

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

    async def auth_admin(self, record: AdminRecord) -> tuple[bool,bool]:
        if not self.con: raise DBError
        data = await self.con.fetchrow(
            'SELECT (admin_password, is_admin) from admins WHERE admin_login=$1',
            record.username)

        if not data: raise DBError
        if data[0][0] == record.password:
            return (True,data[0][1])

        return (False,False)

    async def get_admins(self) -> Iterable[AdminRecord]:
        if not self.con: raise DBError
        data = await self.con.fetch('SELECT (admin_login,is_admin) FROM admins')
        if not data: raise DBError
        response = []

        for row in data:
            login = row[0][0]
            if not login: continue
            admin = {'admin_login': login, 'is_admin': row[0][1]}
            response.append(admin)
        return response
    
    async def new_admin(self, record: AdminRecord) -> None:
         if not self.con: raise DBError
         await self.con.execute(
             '''INSERT INTO admins (admin_login, admin_password, is_admin)
             VALUES ($1, $2, $3)''',
             record.username,
             record.password,
             record.is_admin
         )

    async def get_intentions(self) -> Iterable[dict]:
        if not self.con: raise DBError
        data = await self.con.fetch('''select intention, keyw from intentions right join
                              keywords on intentions.keyword_id = keywords.id;''')
        if not data: raise DBError

        response = []
        for row in data:
            int_text = row['intention']
            if not int_text: continue
            intent = {'intention': int_text, 'keywords': row['keyw']}
            response.append(intent)
        return response
    
    async def get_intention(self, id: int) -> dict:
        if not self.con: raise DBError
        data = await self.con.fetchrow(
            '''SELECT id, intention FROM intentions WHERE keyword_id=$1''',
            id
        )
        if not data: raise DBError
        return data

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

    async def get_additional_text(self, id: int) -> str:
        if not self.con: raise DBError
        data = await self.con.fetchrow(
            '''SELECT add_text FROM additional_text WHERE intention_id=$1''',
            id
        )
        return data[0]

    async def get_mailboxes(self) -> Iterable[dict]:
        if not self.con: raise DBError
        data = await self.con.fetch('''select mailbox from mailboxes''')
        if not data: raise DBError

        response = []
        for row in data:
            mail = {'email': row['mailbox']}
            response.append(mail)
        return response
    
    async def new_mailbox(self, mailbox: str) -> None:
        if not self.con: raise DBError
        await self.con.execute('''INSERT INTO mailboxes (mailbox) VALUES ($1)''', mailbox)


    async def get_keywords(self) -> Iterable[Iterable[str]]:
        if not self.con: raise DBError
        data = await self.con.fetch(
            '''SELECT (id, keyw) FROM keywords'''
        )
        return data
    
    async def get_users(self) -> Iterable[dict]:
        if not self.con: raise DBError
        data = await self.conf.fetch(
            '''SELECT (account) FROM users'''
        )
        response = []
        for row in data:
            response.append(row['account'])
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