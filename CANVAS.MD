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

  - [x] forgot password - POST /auth/forgot-password/
    (envia email com codigo)
  - [x] valida codigo para reset-password - POST /auth/forgout-password/{code}
  - [x] update user password - POST /auth/reset-password/
    (no body vai o code recebido por email e nova senha)

  - [x] login - POST /auth/login
  - [x] logout - POST /auth/logout
  - [x] get my account/profile - POST /auth/profile
  - [x] refresh token - POST /auth/refresh-token
  - [x] validate token - POST /auth/validate-token
# TODO
- [X] [RASA] testar quiz no rasa
- [X] [RASA] criar stories do quiz
- [X] [BACK] integrar socket para mandar msg para o rasa
- [FRONT] criar telas splash, login, create-user, main, chat, quiz, envio de audio
- [FRONT] integrar telas com as apis (login, create-user, chat, quiz)
- [ANALISE_AUDIO] criar analise do audio no servico python analise audio
- [BACK] conectar upload de arquivo com o RabbitMq do servico python
- [BACK] integrar socket para voltar resultado do servico de audio python
- criar docker com todos os serviços(rabbitmq, analise audio, rasa nlu, rasa actions, back)

# DOING

# DONE
