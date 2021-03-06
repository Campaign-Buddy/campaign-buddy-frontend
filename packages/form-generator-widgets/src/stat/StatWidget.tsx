import React, { useCallback } from 'react';
import {
	AggregatedDisplayText,
	AggregatedNumberInput,
	FormGroup,
} from '@campaign-buddy/core-ui';
import styled from 'styled-components';
import { useAggregationContainsBase } from '../utility';
import { StatAggregation } from '@campaign-buddy/json-schema-core';
import { CBWidgetProps } from '../CBWidgetProps';

const StatContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;
	justify-content: center;
`;

const StyledFormGroup = styled(FormGroup)`
	label.bp4-label {
		text-align: center;
	}
`;

interface Stat {
	base?: number;
	bonus?: number;
}

export const StatWidget: React.FC<
	React.PropsWithChildren<CBWidgetProps<Stat, StatAggregation>>
> = ({ value, onChange, label, rawLabel, aggregatedValue, aggregation }) => {
	const isBaseEditable = useAggregationContainsBase(aggregation?.base);
	const isBonusEditable = useAggregationContainsBase(aggregation?.bonus);

	const handleBaseChange = useCallback(
		(base: number) => {
			onChange({ ...(value ?? {}), base });
		},
		[value, onChange]
	);

	const handleBonusChange = useCallback(
		(bonus: number) => {
			onChange({ ...(value ?? {}), bonus });
		},
		[value, onChange]
	);

	const baseHasAggregation =
		typeof aggregation === 'object' && aggregation['base'];

	const bonusHasAggregation =
		typeof aggregation === 'object' && aggregation['bonus'];

	return (
		<StyledFormGroup label={label}>
			<StatContainer>
				{isBaseEditable ? (
					<AggregatedNumberInput
						value={value?.base ?? 0}
						onChange={handleBaseChange}
						aggregatedDisplayValue={`${
							baseHasAggregation ? aggregatedValue?.base : value?.base ?? 0
						}`}
						baseValueLabel={
							baseHasAggregation
								? 'Additional base modifier'
								: `${rawLabel} (base value)`
						}
						fontSize={20}
						hideButton
					/>
				) : (
					<AggregatedDisplayText fontSize={20}>
						{aggregatedValue?.base ?? 0}
					</AggregatedDisplayText>
				)}
				{isBonusEditable ? (
					<AggregatedNumberInput
						value={value?.bonus ?? 0}
						onChange={handleBonusChange}
						aggregatedDisplayValue={getBonusDisplay(
							(bonusHasAggregation ? aggregatedValue?.bonus : value?.bonus) ?? 0
						)}
						baseValueLabel={
							bonusHasAggregation
								? 'Additional bonus modifier'
								: `${rawLabel} (bonus)`
						}
						hideButton
					/>
				) : (
					<AggregatedDisplayText>
						({aggregatedValue?.bonus ?? 0})
					</AggregatedDisplayText>
				)}
			</StatContainer>
		</StyledFormGroup>
	);
};

function getBonusDisplay(bonus: number): string {
	const sign = bonus >= 0 ? '+' : '-';
	return `(${sign}${Math.abs(bonus)})`;
}
