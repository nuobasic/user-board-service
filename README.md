# 암호화 게시판 서비스 


## 기술 스택

- Framework: `NestJS`
- Database: `RDS - mysql`
- ORM: `TypeORM`


# 요구사항 분석

## 1. 게시글 등록
  - 유저가 게시글을 등록 합니다.
  - 제목은 최대 20자, 본문은 200자 입니다.
  - 비밀번호를 설정 가능하며 최소 6자이고 숫자 1개 이상을 포함해야 합니다.
   
## 2. 게시글 목록 조회
  - 게시글의 전체 목록을 조회 합니다.
  - 목록은 등록된 게시글의 최신 순으로 조회를 합니다.
  
## 3. 게시글 삭제
  - 게시글을 삭제합니다.
  - 게시글 생성시 입렵한 비밀번호와 동일해야 삭제가 가능합니다.
  
## 4. 게시글 수정
  - 게시글을 수정합니다.
  - 게시글 수정도 비밀번호를 알아야 수정이 가능합니다.
  - 제목과 내용을 수정할 수 있습니다.
  


## API

- 게시글 등록

| Method | URL | Request Body | Response |
| --- | --- | --- | --- |
| POST | /api/boards | user : 작성자<br>password : 암호화 패스워드<br>title : 제목<br>content : 내용 | statusCode : 201 |

- 게시글 목록 조회

| Method | URL | Request Parameter | Response |
| --- | --- | --- | --- |
| GET | /api/boards | beforeLastId: 이전에 조회한 목록의 마지막 게시글 id<br>keyword: 검색어 | statusCode : 200|

- 게시글 삭제

| Method | URL | Request Path | Request Body | Response |
| --- | --- | --- | --- | --- |
| DELETE | /api/boards/:boardId | id : 게시글 id | password : 비밀번호 | statusCode : 200 |

- 게시글 수정

| Method | URL | Request Path | Request Body | Response |
| --- | --- | --- | --- | --- |
| PUT | /api/boards/:boardId | id : 게시글 id | password : 비밀번호<br>title : 제목<br>content : 내용 | statusCode : 200 |


