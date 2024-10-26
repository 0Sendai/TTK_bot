from aiohttp import web
import aiohttp_cors
from storage import AdminRecord, db_key

routes = web.RouteTableDef()


@routes.post('/login')
async def login(request: web.Request) -> web.Response:
    db = request.app[db_key]
    data = await request.json()
    user = AdminRecord(data['username'], data['password'])
    if await db.auth_admin(user):
        return web.json_response({'success': True})

    return web.json_response({'success': False})

@routes.get('/admins')
async def admins(request: web.Request) -> web.Response:
    db = request.app[db_key]
    data = await db.con.fetch('SELECT (admin_login,is_admin) FROM admins')
    return web.json_response(data)


def init_app() -> web.Application:
    app = web.Application()
    app.add_routes(routes)

    cors = aiohttp_cors.setup(app, defaults={
        "*": aiohttp_cors.ResourceOptions(
            allow_credentials=True,
            expose_headers="*",
            allow_headers="*",
        )
    })

    for route in list(app.router.routes()):
        cors.add(route)

    return app
