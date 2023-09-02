const mapping: Record<string, string> = {
  'app-users': 'app_user',
  appointments: 'appointment',
  'available-hours': 'available_hours',
  companies: 'company',
  mentors: 'mentor',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
