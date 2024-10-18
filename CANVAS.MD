# TODO

## HISTORIA - Rotas de auth e user

### Description

Rotas do backend para autenticação e do usuário.

- Rotas:

  - [x] get user by id/email - GET /users/{id/email}
  - [x] get all user (Paginate) - GET /users
  - [] delete(disable) user - DELETE /users/{id}
  - [x] update user - PATH /users/{id}

  - [x] create user - POST /auth/register

  - [] forgot password - POST /auth/forgot-password/
    (envia email com codigo)
  - [] valida codigo para reset-password - POST /auth/forgout-password/{code}
  - [] update user password - POST /auth/reset-password/
    (no body vai o code recebido por email e nova senha)

  - [x] login - POST /auth/login
  - [x] logout - POST /auth/logout
  - [x] get my account/profile - POST /auth/profile
  - [x] refresh token - POST /auth/refresh-token
  - [x] validate token - POST /auth/validate-token

# DOING

# DONE
