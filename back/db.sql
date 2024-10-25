create table keywords(
    id serial primary key,
    keyw varchar(100)[]
);

create table intentions(
    id serial primary key,
    intention varchar(255),
    keyword_id integer references keywords(id)
);

create table additional_text(
    id serial primary key,
    intention_id integer references intentions(id),
    add_text Text
);

create table users(
    id serial primary key,
    account integer
);

create table admins(
    id serial primary key,
    admin_login varchar(255),
    admin_password varchar(64),
    is_admin boolean
);