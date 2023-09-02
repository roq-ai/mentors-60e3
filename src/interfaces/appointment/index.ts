import { MentorInterface } from 'interfaces/mentor';
import { AppUserInterface } from 'interfaces/app-user';
import { GetQueryInterface } from 'interfaces';

export interface AppointmentInterface {
  id?: string;
  mentor_id: string;
  app_user_id: string;
  date: any;
  time: any;
  created_at?: any;
  updated_at?: any;

  mentor?: MentorInterface;
  app_user?: AppUserInterface;
  _count?: {};
}

export interface AppointmentGetQueryInterface extends GetQueryInterface {
  id?: string;
  mentor_id?: string;
  app_user_id?: string;
}
