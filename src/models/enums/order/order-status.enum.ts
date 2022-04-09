export enum OrderStatus {
  AWAITING_PAYMENT = '입금 대기',
  PAYMENT_ACCEPTED = '입금 확인',
  AWAITING_SHIPMENT = '배송 준비중',
  SHIPPED = '배송중',
  DELIVERED = '배송 완료',
  CANCELLED = '주문 취소',
  EXCHANGED = '교환',
  REFUNDED = '환불',
  FAILED = '주문 실패',
}
