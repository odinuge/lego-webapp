import resolveAsyncRoute from 'app/routes/resolveAsyncRoute';

export default {
  path: 'events',
  indexRoute: resolveAsyncRoute(() => import('./EventListRoute')),
  childRoutes: [
    {
      path: 'calendar',
      ...resolveAsyncRoute(() => import('./CalendarRoute')),
      childRoutes: [
        {
          path: ':year',
          childRoutes: [
            {
              path: ':month'
            }
          ]
        }
      ]
    },
    {
      path: 'create',
      ...resolveAsyncRoute(() => import('./EventCreateRoute'))
    },
    {
      path: ':eventId',
      ...resolveAsyncRoute(() => import('./EventDetailRoute'))
    },
    {
      path: ':eventId/edit',
      ...resolveAsyncRoute(() => import('./EventEditRoute'))
    },
    {
      path: ':eventId/administrate',
      ...resolveAsyncRoute(() => import('./components/EventAdministrate')),
      childRoutes: [
        {
          path: 'attendees',
          ...resolveAsyncRoute(() => import('./EventAttendeeRoute'))
        },
        {
          path: 'admin-register',
          ...resolveAsyncRoute(() => import('./EventAdminRegisterRoute'))
        },
        {
          path: 'abacard',
          ...resolveAsyncRoute(() => import('./EventAbacardRoute'))
        }
      ]
    }
  ]
};
