# xetha-bot

## API Documentation

## Routes

### GET /api/commands
Example Return Body:
```jsonc
[
    {
        "name": "",
        "description": "",
        "usage": [],
        "category": "",
        "aliases": []
    }
    /* ... */
]
```

### GET /api/guild/:guild_id
Example Return Body:
```jsonc
{
    "id": "",
    "name": "",
    "iconURL": "",
    "settings": {
        "prefix": "",
        /* ... */
    },
    "channels": [
        {
            "id": "",
            "name": "",
            "type": "",
            "parent": ""
        }
        /* ... */
    ],
    "roles": [
        {
            "id": "",
            "name": "",
            "color": ""
        }
        /* ... */
    ]
}
```
Blacklist Return Body:
```jsonc
{
    "message": "",
    "reason": "",
    "issued_by": "",
    "issued_at": 0
}
```

### POST /api/guild/:guild_id
POST Payload Body:
```jsonc
{
    "prefix": "",
    /* ... */
}
```
Example Return Body:
```jsonc
{
    "guild_id": "",
    "name": "",
    "prefix": ""
    /* ... */
}
```

### GET /api/member/:guild_id/:member_id
Example Return Body:
```jsonc
{
    "guild_id": "",
    "member_id": "",
    "tag": "",
    "avatarURL": "",
    "dashboard": false,
    "data": {
        /* ... */
    }
}
```

### POST /api/member/:guild_id/:member_id
POST Payload Body:
```jsonc
{
    "experience": 0,
    /* ... */
}
```
Example Return Body:
```jsonc
{
    "guild_id": "",
    "member_id": ""
    /* ... */
}
```

### GET /api/user/:user_id
Example Return Body:
```jsonc
{
    "id": "",
    "tag": "",
    "username": "",
    "discriminator": "",
    "avatarURL": "",
    "data": {
        /* ... */
    }
}
```
Blacklist Return Body:
```jsonc
{
    "message": "",
    "reason": "",
    "issued_by": "",
    "issued_at": 0
}
```

### POST /api/user/:user_id
POST Payload Body:
```jsonc
{
    "premium": true,
    /* .... */
}
```
Example Return Body:
```jsonc
{
    "user_id": "",
    "tag": ""
    /* ... */
}
```
