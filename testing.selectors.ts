// Selector Test
describe('user selectors', () => {
    it('should return all users', () => {
      const state = createUsersState();
      expect(getAllUsers(state)).toMatchSnapshot();
    });
   });
   
   // Selector Test - Override the state
   describe('user selectors', () => {
      it('should return all users', () => {
        const state = createUsersState();
   
        state.users.entities['1'].firstName = 'Joe';
   
        const users = getAllUsers(state);
   
        expect(users[0]).toMatchSnapshot();
      });
    });
   
   