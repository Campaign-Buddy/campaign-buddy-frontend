import styled from 'styled-components';

export const DropDownButtonContainer = styled.div`
	align-self: center;
	padding: 0
		${({ theme }) => theme.panelLayout.tab.overflow.buttonHorizontalPadding}px;
`;
