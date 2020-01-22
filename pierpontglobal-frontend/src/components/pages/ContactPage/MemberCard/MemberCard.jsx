import React from 'react';
import styled from 'styled-components';

const TeamMemberCard = styled.div`
  width: auto;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const CardHeader = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 16px 8px;
`;

const HeaderPhoto = styled.img`
  border-radius: 50%;
  width: 42px;
  height: 42px;
`;

const UserRole = styled.div`
  width: 100%;
  text-align: center;
  & > span {
    font-weight: 100;
    font-size: 0.8rem;
  }
`;

const CarBody = styled.div`
  width: 100%;
  height: auto;
  padding: 16px;
`;

const Name = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 8px;
  & > span {
    font-weight: 400;
    font-size: 1.15rem;
  }
`;

const PhoneNumber = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 8px;
  & > span {
    font-weight: 200;
    font-size: 1.05rem;
  }
`;

const Email = styled.div`
  width: 100%;
  text-align: center;
  & > a {
    font-weight: 200;
    font-size: 0.95rem;
    color: blue;
    cursor: pointer;
  }
`;

const MemberCard = ({user}) => {
  return (
    <TeamMemberCard>
      <CardHeader>
        <HeaderPhoto alt={`${user.name} | Pierpont Global, Inc`} src={user.photo ? user.photo : '/images/no-user-photo.png'} />
        <UserRole>
          <span>
            {user.role}
          </span>
        </UserRole>
      </CardHeader>
      <CarBody>
        <Name>
          <span>
            {user.name}
          </span>
        </Name>
        <PhoneNumber>
          <span>
            {user.phone}
          </span>
        </PhoneNumber>
        <Email>
          <a href={`mailto:${user.email}`}>
            {user.email}
          </a>
        </Email>
      </CarBody>
    </TeamMemberCard>
  );
}

export default MemberCard;
