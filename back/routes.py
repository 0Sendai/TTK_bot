from aiohttp import web
from storage import AdminRecord, AdminFields

routes = web.RouteTableDef()

@routes.post('/login')
async def login(request: web.Request) -> web.Response:
    db = request.app[db_key]
    data = await request.post()
    user = AdminRecord(data[AdminFields.username], data[AdminFields.password])
    if await db.auth_admin(user):
        return web.Response(status=200)

    return web.Response(status=401)

def init_app() -> web.Application:
    app = web.Application()
    app.add_routes(routes)
    return app