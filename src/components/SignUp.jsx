import React from 'react';
import { isEmail, isNotEmpty, hasMinLength, isEqualToOtherValue } from '../util/validation'
import { useActionState } from 'react'

// we moved action function out of component bcz it is not "depending on any prop and state" (then it shld be inside component")
// based on component re-rendering it also created the form again so it is better to keep it out.
function signUpAction(prevFormState, formData) {
  // when we use useActionState then action function accepts 2 argument.
  const email = formData.get('email')
  const password = formData.get('password')
  const confirmPassword = formData.get('confirm-password')
  const firstName = formData.get('first-name')
  const lastName = formData.get('last-name')
  const role = formData.get('role')
  const acquisitionChannel = formData.getAll('acquisition');
  const terms = formData.get('terms')

  // const dataObject = Object.fromEntries(formData.entries());
  // console.log(dataObject);
  const error = [];

  if (!isEmail(email)) {
    error.push('Please enter a valid email address');
  }

  if (!isNotEmpty(password) && !hasMinLength(password, 8)) {
    error.push('Password should have min 8 character');
  }

  if (isNotEmpty(password) && !isEqualToOtherValue(password, confirmPassword)) {
    error.push('Password do not match');
  }

  if (!isNotEmpty(firstName) || !isNotEmpty(lastName)) {
    error.push('These fields cannot be empty');
  }

  if (!isNotEmpty(role)) {
    error.push('Role has to be selected');
  }

  if (acquisitionChannel.length === 0) {
    error.push('Please select at least one checkbox')
  }

  if (!terms) {
    error.push('Please check the terms and conditions');
  }

  if (error.length > 0) {
    return {
      error: error, enteredValue: { email, password, confirmPassword, firstName, lastName, role, acquisitionChannel, terms }
    }
  }
  return { error: null }
}


export default function SignUp() {
  // we can write useActionState after
  const [formState, formAction] = useActionState(signUpAction, { error: null })

  return (
    <form action={formAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" defaultValue={formState.enteredValue?.email} />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" defaultValue={formState.enteredValue?.password} />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            defaultValue={formState.enteredValue?.confirmPassword}
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" defaultValue={formState.enteredValue?.firstName} />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" defaultValue={formState.enteredValue?.lastName} />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role" defaultValue={formState.enteredValue?.role}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
            defaultChecked={formState.enteredValue?.acquisitionChannel.includes('google')}
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
            defaultChecked={formState.enteredValue?.acquisitionChannel.includes('friend')}
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" defaultChecked={formState.enteredValue?.acquisitionChannel.includes('other')} />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" defaultChecked={formState.enteredValue?.terms} />I
          agree to the terms and conditions
        </label>
      </div>

      {/* Display the error message after validation in the form */}

      {(formState.error) &&
        <ul className='error'> {formState.error.map(error =>
          <li key={error}> {error} </li>)}
        </ul>}

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button">Sign up</button>
      </p>
    </form>
  );
}