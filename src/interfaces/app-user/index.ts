import { AppointmentInterface } from 'interfaces/appointment';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface AppUserInterface {
  id?: string;
  user_id: string;
  interests: string;
  created_at?: any;
  updated_at?: any;
  appointment?: AppointmentInterface[];
  user?: UserInterface;
  _count?: {
    appointment?: number;
  };
}

export interface AppUserGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  interests?: string;
}
