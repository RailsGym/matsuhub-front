import styled from 'styled-components';
import { BiDockLeft } from 'react-icons/bi';
import { FiLink2 } from 'react-icons/fi';
import { FiUsers } from 'react-icons/fi';

const SContainer = styled.div`
  width: 194px;
  position: fixed;
  height: 100%
  background-color: #f9f9f9;
  border-right: solid 2.5px #ebebeb;
`;

const SUl = styled.ul`
  height: 100vh;
`;

const SSideBarList = styled.li`
  margin: 0 20px;
  text-align: left;
  padding: 20px 0;
  color: #4d4d4d;
`;

const SSideBarFirstList = styled(SSideBarList)`
  padding-top: 25px;
  border-bottom: solid 2.5px #ebebeb;
`;

const IconStyle = {
  display: "inline-block",
  fontSize: "25px",
  color: "#D8D8D8",
  marginRight: "8px",
  marginBottom: "4px"
};

export default function Sidebar() {
  return (
    <SContainer>
      <SUl>
        <SSideBarFirstList>
          <BiDockLeft style={IconStyle} />
          仮説キャンバス
        </SSideBarFirstList>
        <SSideBarList>
          <FiLink2 style={IconStyle} />
          設定
        </SSideBarList>
        <SSideBarList>
          <FiUsers style={IconStyle} />
          メンバー
        </SSideBarList>
      </SUl>
    </SContainer>
  );
}
