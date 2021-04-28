import { EntityDefinition, types } from '@campaign-buddy/json-schema-core';

export const spell: EntityDefinition = {
	name: 'spell',
	schema: types.object({
		name: types.string(),
		description: types.richText(),
		school: types.string(),
		components: types.object({
			material: types.boolean(),
			somatic: types.boolean(),
			verbal: types.boolean(),
		}),
		duration: types.number(),
		classes: types.arrayOf.strings(),
		level: types.number(),
	}),
};