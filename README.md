React 기반 지도 웹 서비스와 React Native 앱을 연동하여,
사용자의 현재 위치를 받아 지도 중심을 설정하고, 클릭한 위치의 주소를 즐겨찾기로 저장/조회할 수 있는 WebView 연동 지도 뷰.
로컬스토리지 기반 상태 관리, Kakao Maps API 활용, 그리고 웹 ↔ 앱 간 postMessage 통신 흐름이 핵심 구조.

## 개요
React 웹은 카카오 지도를 중심으로 마커 렌더링, 주소 검색, 즐겨찾기 기능 등을 제공
**React Native 앱 (Expo)**은 expo-location으로 위치 권한을 요청하고 현재 좌표를 측정하여 웹에게 전달
Web ↔ RN 통신은 WebView의 postMessage / onMessage 인터페이스를 통해 수행됨
사용자의 지도 상 상호작용(클릭, 즐겨찾기 등록 등)은 모두 React Custom Hook으로 분리되어 구성됨

---

## 기능별 훅 구성
### useWebViewMessage
RN 에서 오는 메시지를 수신하는 이벤트 리스너 훅
KakaoMap 이 마운트 되어 있는 동안에는 항상 열려있어서 RN 이 위치 정보 보내주면 자동으로 처리됨.

### useUserLocationMarker
본인 위치로 지도 이동시키는 훅
useWebViewMessage 로 받은 위치정보 props 로 받음.
의존성 배열에 props 로 받은 userLocation 을 넣어서 값이 바뀌면 (새로 누르면) 알아서 setCenter 함. 해당 위치에 마커 찍음.

### useClickToAddressMarker
지도 클릭하면 클릭한 좌표의 도로명주소와 지번주소를 반환, 해당 위치에 마커 찍고, 인포윈도우로 상세 주소 표시. setSelectedAddress() 호출해서 외부에 주소 전달하는 이벤트 리스너
클릭한 위치의 위도, 경도를 이벤트로 받고, geocoder 사용해서 좌표 → 주소 변환 수행.
setSelectedAddress 로 주소 초기화, 외부로 전달. 외부에서 이 주소로 즐찾 추가 가능.
마커 찍기 + 인포윈도우 띄우기 가능.

### useDisplayFavoriteMarkers
즐찾 마커를 지도 위에 온/오프하는 훅
의존성 배열로 지도 객체 변경, 즐찾 보기 여부, 즐찾 목록 변경 이 있음.
온/오프 상관 없이 수행되면 먼저 기존 마커 전부 지도에서 제거 → 저장된게 없거나 off 일 시 바로 리턴
→ on 일 시 각 주소마다 마커 생성 함수 createFavoriteMarker 수행.

**createFavoriteMarker :** 
geocoder 로 주소 → 위도 경도로 변환.
해당 위치에 마커 생성해 지도에 붙임.
마커 클릭 시 인포윈도우 보임.
on/off 할때마다 마커 지워야 하므로 markersRef.current 에 마커 저장

### useDisplayCenterAddress
지도 중심점이 바뀔 때마다, 그 중심 좌표에 해당하는 주소 표시하는 훅
마찬가지로 지오코더 사용
idle (조작 멈춘) 상태일 때 handleIdle 수행.
handleIdle : 현재 중심좌표 얻고, region_type === "H” 만 골라서 보여줌.
region_type 이 S 는 시,도 , B 면 시군구, H 면 행정동

---
추후 고려사항
즐겨찾기 마커는 매번 전체 clear 후 재렌더링 (단순성 우선)
- 향후 개선 여지: marker key 기반 diff 적용, 캐싱 최적화 가능

WebView 통신은 오직 1가지 타입(getLocation) 메시지만 처리
- 확장성 고려해 메시지 라우터 함수 분리 구조로 개선 가능

geocoder 관련 연산은 전부 client-side에서 수행
- 과도한 요청 시 rate limit 가능성 → debounce 처리 고려 가능

