import moment from 'moment';
import _ from 'lodash';

export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};


export const isAuthenticated = (input, [a, args, context]) => {
  const { session } = context;
  if (!session) {
    throw new Error('Not authenticated');
  } else if (moment(session.expires).isBefore(moment())) {
    throw new Error(`Token expired at ${ session.expires }`);
  }
  return [input, [a, args, context]];
};

export const hasRoles = (rolesRequired) => async (input, [a, args, context]) => {
  const userRoles = context['session'].user.roles.map((r) => r.roleId);
  const intersection = _.intersection(userRoles, rolesRequired);
  const missing = _.without(rolesRequired, ...intersection);
  if (intersection.length !== rolesRequired.length) {
    throw new Error(`User is missing roles [${ missing.join(' ') }]`);
  }
  return [input, [a, args, context]];
}

export const join = (fns) => async (...args) => {
  let valueReturn = null
  let argsWorking = args;
  for (const fn of fns) {
    [valueReturn, argsWorking] = await fn(valueReturn, argsWorking);    
  }
  return valueReturn;
};

