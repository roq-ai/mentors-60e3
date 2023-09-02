import { AppointmentInterface } from 'interfaces/appointment';
import { AvailableHoursInterface } from 'interfaces/available-hours';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface MentorInterface {
  id?: string;
  user_id: string;
  specialization: string;
  experience: number;
  created_at?: any;
  updated_at?: any;
  appointment?: AppointmentInterface[];
  available_hours?: AvailableHoursInterface[];
  user?: UserInterface;
  _count?: {
    appointment?: number;
    available_hours?: number;
  };
}

export interface MentorGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  specialization?: string;
}
