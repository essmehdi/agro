export type Event = {
  id: number;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  longitude: number;
  latitude: number;
  location: string | null;
  attendees: number;
  owner: User;
  organizers: User[];
  is_user_attending: boolean;
};

export type User = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export type LoginResponse = {
  token: string;
}

export type MessageResponse = {
  mesaage: string;
}