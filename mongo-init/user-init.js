// admin DB로 전환 및 인증
db = db.getSiblingDB('admin');
db.auth("root", "root1234");

// Replica Set 초기화 (이미 초기화되어 있으면 무시)
try {
  rs.status();
} catch (e) {
  rs.initiate({
    _id: "rs0-user",
    members: [
      { _id: 0, host: "192.168.56.11:27017" }
    ]
  });
}

// user_db 데이터베이스에 컬렉션 및 샘플 데이터 생성
db = db.getSiblingDB('users');
db.createCollection("users_infos");
db.createCollection("login_histories");