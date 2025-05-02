
import React from 'react';

export type TAccount = {
  slug?: string[];
}


export default async function AccountPage({ params }: { params: any }) {

  return (
    <>
      goldlabel.pro/account
      <ul>
        <li>
          Login
        </li>
        <li>
          Logout
        </li>
        <li>
          Account
        </li>
        <li>
          History
        </li>
        <li>
          Location
        </li>
        <li>
          Pingpong
        </li>
      </ul>
    </>
  );
}
