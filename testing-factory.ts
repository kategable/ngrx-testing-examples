// State Factory
const createUser = ({
  id = 0,
  firstName = '',
  lastName = '',
  userName = ''
} = {}): User => ({
  id: id,
  firstName: firstName || 'firstName',
  lastName: lastName || `lastName`,
  userName: userName || `${firstName}.${lastName}`
});

const createUsersState = ({
  entities = {
    '1': createUser({ id: 1, firstName: 'Bob' }),
    '2': createUser({ id: 2, firstName: 'Sue' }),
    '3': createUser({ id: 3, firstName: 'Mary' })
  },
  ids = ['1', '2', '3'],
  selectedId = 0,
  loading = false,
  error = ''
} = {}) => ({
  users: {
    ids,
    entities,
    selectedId,
    loading,
    error
  }
});	