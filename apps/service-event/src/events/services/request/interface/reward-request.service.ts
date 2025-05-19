export interface RewardRequestService {
  processRewardRequest(eventId: string, userId: string): Promise<void>;
  checkRewardCondition(eventId: string, userId: string): Promise<boolean>;
  getApprovalType(eventId: string): Promise<'auto' | 'manual'>;
}