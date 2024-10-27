import asyncio
from back import lemma
from back.storage import PGDatabase
from back.config import DB_NAME, DB_USER, DB_USER_PASS


async def main():
    db = PGDatabase()
    await db.connect(db_name=DB_NAME, db_user=DB_USER,db_user_pass=DB_USER_PASS)
    data = await db.get_keywords()
    print(data)

if __name__ == "__main__":
    asyncio.run(main())