## Project Structure
nestjs-msa-project/
├── apps/
│   ├── gateway-server/    # API Gateway
│   ├── service-user/      # 사용자 서비스
│   └── service-event/     # 이벤트 서비스
├── libs/                  # 공통 유틸리티 및 라이브러리
│   ├── common/
│   └── database/
├── README.md
├── package.json
├── nest-cli.json
└── tsconfig.json

## Project Description
Gateway-server	모든 외부 요청을 받아 각 서비스로 라우팅. 인증 등 공통 처리
Service-user	사용자 관리(회원가입, 로그인, 정보조회 등)
Service-event	이벤트 관리 및 보상 관리(이벤트 생성, 조회, 참여 등)

## Decorator Description
@Roles - 사용자 권한 별로 접근할 수 있는 데이터 제한을 위해 사용
@NoAuth - 이벤트 페이지 조회 및 보상 정보 조회 등 사용자 인증 없이 접근이 가능하도록 사용

## API 구조
# Process
Client -> Gateway -> Service -> Gateway -> Client

# 구조 선택 이유
서비스가 독립적으로 운영될 수 있도록 하기 위함입니다. MSA의 핵심 특성 중 하나는 각 서비스가 독립적으로 개발, 배포, 운영될 수 있어야 한다는 점입니다.
API Gateway를 중간에 두면, 클라이언트가 각 서비스의 상세 위치나 구현에 직접 접근하지 않고, Gateway를 통해 요청이 라우팅됩니다. 이를 통해 서비스의 주소나 내부 구조가 바뀌더라도 클라이언트와 서비스가 서로 영향을 받지 않고 독립적으로 운영할 수 있습니다. Gateway가 서비스 간 결합도를 낮추고, 서비스의 독립성 및 유연성을 보장하는 역할을 하므로, MSA의 핵심 원칙인 서비스의 독립적 운영을 실현할 수 있습니다.

## 구현 중 어려웠던 점
3년 가까이 모놀로식 방식으로만 개발해오다가, 짧은 시간 안에 MSA 구조와 Docker, NestJS 등 새로운 기술을 바로 적용하다 보니 세부적인 부분들을 충분히 챙기지 못한 점이 아쉽습니다. 앞으로 해당 프로젝트를 지속적으로 고도화하면서, 부족했던 부분들을 하나씩 보완해 나갈 계획입니다. MSA의 특성처럼 각 서비스를 독립적으로 운영하며, 실제 경험을 통해 더 깊이 있는 이해와 완성도를 높여가겠습니다.