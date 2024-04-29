# 백엔드 미니프로젝트 (김종진, 쇼핑몰)

## 구현 내용

### 회원가입 & 로그인
- 회원가입 기능 및 로그인 기능 구현 (jwt 토큰 사용)
- jwt 토큰 생성 시, role을 포함시켜 권한 검증 목적.
- 회원가입 시 총 3개의 정보가 테이블에 각각 저장됨 (회원정보-user, 주소정보-address, 카트-cart)
### 상품 관련
- 상품 등록 (role이 관리자인 경우에만 등록 가능) - 현재 에러 발생하여 수정 중.
isLoggedIn 미들웨어를 붙이기 전엔 정상 작동.
- 전체 상품 조회 (쿼리를 통한 전체 상품 조회 혹은 특정 조건에 따른 조회)
- 상품 상세 조회 (파라미터를 통한 상품 상세 정보 조회)
- 상품 수정
- 상품 삭제

### 리뷰 관련
- 리뷰 등록
- 상품에 대한 전체 리뷰 조회 
- 리뷰 상세 조회
- 리뷰 수정
- 리뷰 삭제

### 카테고리 관련
- 카테고리 등록
- 카테고리 조회 (카테고리에 포함되는 모든 상품 조회 기능)

### 주소 관련
- 주소 등록
- 특정 사용자의 모든 주소 조회

### 카트 관련
- 회원가입 시 생성되는 카트 테이블을 위한 Dao는 있으나, 상품 구매와 관련된 부분은 미구현