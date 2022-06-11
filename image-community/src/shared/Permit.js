import React from 'react'
import { useSelector } from 'react-redux';
import { apiKey } from "./firebase";

const Permit = (props) => {
  const isLogIn = useSelector(state => state.user.isLogIn);
  const _sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const isSession = sessionStorage.getItem(_sessionKey) ? true : false; 

  if (isLogIn && isSession) {
      return <div>{props.children}</div>;
  }
  return null;
}

export default Permit
