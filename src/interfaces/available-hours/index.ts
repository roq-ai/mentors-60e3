import { MentorInterface } from 'interfaces/mentor';
import { GetQueryInterface } from 'interfaces';

export interface AvailableHoursInterface {
  id?: string;
  mentor_id: string;
  start_time: any;
  end_time: any;
  day_of_week: number;
  created_at?: any;
  updated_at?: any;

  mentor?: MentorInterface;
  _count?: {};
}

export interface AvailableHoursGetQueryInterface extends GetQueryInterface {
  id?: string;
  mentor_id?: string;
}
