import {
    User,
    generateUser,
    generateUserMap,
    generateUserArray
  } from './user.model';
  import * as actions from './user.actions';
  import {
    userReducer,
    initialUserState,
    getSelectedId,
    getLoading,
    getError,
    getQuery
  } from './user.reducer';
  import { Update } from '@ngrx/entity';
  
  const INITIAL_STATE_WITH_ERROR = {
    ...initialUserState,
    error: 'some error'
  };
  const BLANK_ERROR_MESSAGE = '';
  
  describe('userReducer', () => {
    describe('upon an undefined action', () => {
      it('should return the default state upon an undefined action', () => {
        const action = { type: 'NOT DEFINED' } as any;
  
        expect(userReducer(initialUserState, action)).toEqual(initialUserState);
      });
    });
  
    describe('upon CreateUser', () => {
      it('should set loading to true and clear any error', () => {
        const action = new actions.CreateUser({ user: generateUser() });
  
        expect(userReducer(INITIAL_STATE_WITH_ERROR, action)).toEqual({
          ...initialUserState,
          loading: true,
          error: BLANK_ERROR_MESSAGE
        });
      });
    });
  
    describe('upon CreateUserSuccess', () => {
      it('should add the given User, set loading to false, and clear any error', () => {
        const result = generateUser();
        const action = new actions.CreateUserSuccess({ result });
  
        expect(userReducer(INITIAL_STATE_WITH_ERROR, action)).toEqual({
          ...initialUserState,
          ...generateUserMap([result]),
          loading: false,
          error: BLANK_ERROR_MESSAGE
        });
      });
    });
  
    describe('upon CreateUserFail', () => {
      it('should set loading to true and echo the error', () => {
        const error = 'test create error';
        const action = new actions.CreateUserFail({ error });
  
        expect(userReducer(initialUserState, action)).toEqual({
          ...initialUserState,
          loading: false,
          error: `User create failed: ${error}`
        });
      });
    });
  
    describe('upon SearchAllUserEntities', () => {
      it('should remove User entities, set loading to true, and clear any error', () => {
        const initialUserStateWithUserEntities = {
          ...INITIAL_STATE_WITH_ERROR,
          ...generateUserMap()
        };
        const action = new actions.SearchAllUserEntities();
  
        expect(userReducer(initialUserStateWithUserEntities, action)).toEqual({
          ...initialUserState,
          loading: true,
          error: BLANK_ERROR_MESSAGE
        });
      });
    });
  
    describe('upon SearchAllUserEntitiesSuccess', () => {
      it('should add User entities, set loading to false, and clear any error', () => {
        const result = generateUserArray();
        const action = new actions.SearchAllUserEntitiesSuccess({ result });
  
        expect(userReducer(INITIAL_STATE_WITH_ERROR, action)).toEqual({
          ...initialUserState,
          ...generateUserMap(result),
          loading: false,
          error: BLANK_ERROR_MESSAGE
        });
      });
    });
  
    describe('upon SearchAllUserEntitiesFail', () => {
      it('should set loading to false and echo the error', () => {
        const error = 'test search error';
        const action = new actions.SearchAllUserEntitiesFail({ error });
  
        expect(userReducer(initialUserState, action)).toEqual({
          ...initialUserState,
          loading: false,
          error: `User search failed: ${error}`
        });
      });
    });
  
    describe('upon LoadUserById', () => {
      it('should remove user entities, set selected id, and clear any error', () => {
        const id = 8675309;
        const initialUserStateWithUserEntities = {
          ...INITIAL_STATE_WITH_ERROR,
          ...generateUserMap()
        };
        const action = new actions.LoadUserById({ id });
  
        expect(userReducer(initialUserStateWithUserEntities, action)).toEqual({
          ...initialUserState,
          selectedId: id,
          loading: true,
          error: BLANK_ERROR_MESSAGE
        });
      });
    });
  
    describe('upon LoadUserByIdSuccess', () => {
      it('should add the given User, set loading to false, and clear any error', () => {
        const result = generateUser();
        const action = new actions.LoadUserByIdSuccess({ result });
  
        expect(userReducer(INITIAL_STATE_WITH_ERROR, action)).toEqual({
          ...initialUserState,
          ...generateUserMap([result]),
          loading: false,
          error: BLANK_ERROR_MESSAGE
        });
      });
    });
  
    describe('upon LoadUserByIdFail', () => {
      it('should set loading to false and echo the error', () => {
        const error = 'test load by id error';
        const action = new actions.LoadUserByIdFail({ error });
  
        expect(userReducer(initialUserState, action)).toEqual({
          ...initialUserState,
          loading: false,
          error: `User load failed: ${error}`
        });
      });
    });
  
    describe('upon UpdateUser', () => {
      it('should set loading to true and clear any errior', () => {
        const user = generateUser();
        const action = new actions.UpdateUser({ user });
  
        expect(userReducer(INITIAL_STATE_WITH_ERROR, action)).toEqual({
          ...initialUserState,
          loading: true,
          error: BLANK_ERROR_MESSAGE
        });
      });
    });
  
    describe('upon UpdateUserSuccess', () => {
      it('should add the given User, set loading to false, and clear any error', () => {
        const user = generateUser();
        const initialUserStateWithUser = {
          ...INITIAL_STATE_WITH_ERROR,
          ...generateUserMap([user])
        };
        const updatedUser = {
          ...user,
          name: user.name + ' EDITED',
          description: user.description + ' EDITED'
        };
        const update = {
          id: updatedUser.id,
          changes: updatedUser
        } as Update<User>;
        const action = new actions.UpdateUserSuccess({ update });
  
        expect(userReducer(initialUserStateWithUser, action)).toEqual({
          ...initialUserStateWithUser,
          ...generateUserMap([updatedUser]),
          loading: false,
          error: BLANK_ERROR_MESSAGE
        });
      });
    });
  
    describe('upon UpdateUserFail', () => {
      it('should set loading to false and echo the error', () => {
        const error = 'test update error';
        const action = new actions.UpdateUserFail({ error });
  
        expect(userReducer(initialUserState, action)).toEqual({
          ...initialUserState,
          loading: false,
          error: `User update failed: ${error}`
        });
      });
    });
  
    describe('upon DeleteUserById', () => {
      it('should set the id, set loading to true, and clear any error', () => {
        const id = 4815162342;
        const action = new actions.DeleteUserById({ id });
  
        expect(userReducer(INITIAL_STATE_WITH_ERROR, action)).toEqual({
          ...initialUserState,
          selectedId: id,
          loading: true,
          error: BLANK_ERROR_MESSAGE
        });
      });
    });
  
    describe('upon DeleteUserByIdSuccess', () => {
      it('should remove the id-given user, set loading to false, and clear any error', () => {
        const id = 18009453669;
        const userToBeRemoved = generateUser(id);
        const expectedUserEntities = generateUserArray();
        const userEntitiesWithUserToBeRemoved = [
          ...expectedUserEntities,
          userToBeRemoved
        ];
        const initialUserStateWithAllUserEntities = {
          ...INITIAL_STATE_WITH_ERROR,
          ...generateUserMap(userEntitiesWithUserToBeRemoved)
        };
        const action = new actions.DeleteUserByIdSuccess({ id });
  
        expect(
          userReducer(initialUserStateWithAllUserEntities, action)
        ).toEqual({
          ...initialUserStateWithAllUserEntities,
          ...generateUserMap(expectedUserEntities),
          loading: false,
          error: BLANK_ERROR_MESSAGE
        });
      });
    });
  
    describe('upon DeleteUserByIdFail', () => {
      it('should set loading to false and echo the error', () => {
        const error = 'test delete error';
        const action = new actions.DeleteUserByIdFail({ error });
  
        expect(userReducer(initialUserState, action)).toEqual({
          ...initialUserState,
          loading: false,
          error: `User delete failed: ${error}`
        });
      });
    });
  
    describe('upon SetSearchQuery', () => {
      it('should set the query', () => {
        const query = {
          filter: 'someFilter',
          sorting: 'someSort',
          limit: 1000000000000,
          page: 888888
        };
        const action = new actions.SetSearchQuery(query);
  
        expect(userReducer(initialUserState, action)).toEqual({
          ...initialUserState,
          query
        });
      });
    });
  
    describe('upon SelectUserById', () => {
      it('should set the id and clear any error', () => {
        const id = 73;
        const action = new actions.SelectUserById({ id });
  
        expect(userReducer(INITIAL_STATE_WITH_ERROR, action)).toEqual({
          ...initialUserState,
          selectedId: id,
          error: BLANK_ERROR_MESSAGE
        });
      });
    });
  });
  
  describe('getters', () => {
    describe('getSelectedId', () => {
      it('should return the selected id', () => {
        expect(getSelectedId(initialUserState)).toEqual(initialUserState.selectedId);
      });
    });
    describe('getLoading', () => {
      it('should return the selected id', () => {
        expect(getLoading(initialUserState)).toEqual(initialUserState.loading);
      });
    });
    describe('getError', () => {
      it('should return the selected id', () => {
        expect(getError(INITIAL_STATE_WITH_ERROR))
          .toEqual(INITIAL_STATE_WITH_ERROR.error);
      });
    });
    describe('getQuery', () => {
      it('should return the selected id', () => {
        expect(getQuery(initialUserState))
          .toEqual(initialUserState.query);
      });
    });
  });
  