set MONGO="D:\ProgramFiles\MongoDB\Server\3.4\bin\mongod.exe"
set opts= --dbpath
set DB_PATH="d:\mongoDB\data"

%MONGO% %opts% %DB_PATH% --auth
pause