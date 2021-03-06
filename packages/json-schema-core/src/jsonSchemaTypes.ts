import { EntityDefinition } from './EntityDefinition';
import { Widgets } from './Widgets';
import { CampaignBuddySchema } from './CampaignBuddySchema';
import {
	CBSchemaFunc,
	ChoiceAggregation,
	DisplayInfo,
	DisplayInfoWithEnum,
	EntityAggregation,
	ImageAggregation,
	MultiChoiceAggregation,
	MultiEntityAggregation,
	NumericResourceAggregate,
	OptionAggregation,
	StatAggregation,
} from './interfaces';

/* Primitive Types */

export const string: CBSchemaFunc = (info) => ({
	type: 'string',
	title: info?.title,
	description: info?.description,
	$uiCols: info?.cols,
	$aggregate: info?.aggregate,
	$defaultVisibleRoles: info?.defaultVisibleRoles,
});

export const boolean: CBSchemaFunc = (info) => ({
	type: 'boolean',
	title: info?.title,
	description: info?.description,
	$uiCols: info?.cols,
	$aggregate: info?.aggregate,
	$defaultVisibleRoles: info?.defaultVisibleRoles,
});

export const number: CBSchemaFunc = (info) => ({
	type: 'number',
	title: info?.title,
	description: info?.description,
	$uiCols: info?.cols,
	$aggregate: info?.aggregate,
	$defaultVisibleRoles: info?.defaultVisibleRoles,
});

/**
 * Numeric resources are properties that have a maximum value
 * and can be spent or regained over time (e.g. health, spell slots,
 * bardic inspirations).
 */
export const numericResource: CBSchemaFunc<NumericResourceAggregate> = (
	info
) => ({
	type: 'object',
	title: info?.title,
	description: info?.description,
	$uiWidget: Widgets.NumericResource,
	properties: {
		max: {
			type: 'number',
		},
		current: {
			type: 'number',
		},
	},
	$uiCols: info?.cols,
	$aggregate: info?.aggregate,
	$defaultVisibleRoles: info?.defaultVisibleRoles,
});

export const genericObject: CBSchemaFunc<never> = (info) => ({
	type: 'object',
	title: info?.title,
	description: info?.description,
	$uiCols: info?.cols,
	$defaultVisibleRoles: info?.defaultVisibleRoles,
});

export const dynamicallyResolvedType: (
	expression: string,
	info?: DisplayInfo
) => CampaignBuddySchema<any> = (expression, info) => ({
	type: 'object',
	$dynamicTypeExpression: expression,
	title: info?.title,
	description: info?.description,
	$uiCols: info?.cols,
	$defaultVisibleRoles: info?.defaultVisibleRoles,
});

// TODO: Actually return a schema representing a CampaignBuddySchema
export const schema: CBSchemaFunc<never> = (info) => ({
	type: 'object',
	$uiWidget: Widgets.SchemaBuilder,
	title: info?.title,
	description: info?.description,
	$uiCols: info?.cols,
	$defaultVisibleRoles: info?.defaultVisibleRoles,
});

export const object: (object: {
	[k: string]: CampaignBuddySchema<any>;
}) => CampaignBuddySchema<never> = (object) => ({
	type: 'object',
	properties: object,
});

/* Complex Types */

const _arrayOf: (
	object: CampaignBuddySchema<any>,
	info?: DisplayInfo<string>
) => CampaignBuddySchema<string> = (object, info) => ({
	type: 'array',
	items: object,
	title: info?.title,
	description: info?.description,
	$uiWidget: object.$uiWidget,
	$uiCols: info?.cols ?? object?.cols,
	$aggregate: info?.aggregate,
	$defaultVisibleRoles: info?.defaultVisibleRoles,
});

export const entity: (
	entity: EntityDefinition,
	info?: DisplayInfo<EntityAggregation>
) => CampaignBuddySchema<EntityAggregation> = (object, info) => ({
	type: 'object',
	properties: {
		// By convention should never be set manually, only
		// through aggregation
		availableEntityIds: _arrayOf(string()),
		entity: {
			type: 'object',
			properties: {
				id: string(),

				// Computed from id, not set manually
				entityData: genericObject(),
			},
			$tags: ['dehydratedEntity'],
			$entity: object.name,
		},
	},
	$entity: object.name,
	$uiWidget: Widgets.EntityPicker,
	title: info?.title,
	description: info?.description,
	$uiCols: info?.cols,
	$aggregate: info?.aggregate,
	$defaultVisibleRoles: info?.defaultVisibleRoles,
});

export const multiEntity: (
	entity: EntityDefinition,
	info?: DisplayInfo<MultiEntityAggregation>
) => CampaignBuddySchema<MultiEntityAggregation> = (object, info) => ({
	type: 'object',
	properties: {
		// By convention should never be set manually, only
		// through aggregation
		availableEntityIds: _arrayOf(string()),
		entities: _arrayOf({
			type: 'object',
			properties: {
				id: string(),

				// Computed form id, not set manually
				entityData: genericObject(),
			},
			$tags: ['dehydratedEntity'],
			$entity: object.name,
		}),
	},
	$entity: object.name,
	$uiWidget: Widgets.MultiEntityPicker,
	title: info?.title,
	description: info?.description,
	$uiCols: info?.cols,
	$aggregate: info?.aggregate,
	$defaultVisibleRoles: info?.defaultVisibleRoles,
});

export const stat: CBSchemaFunc<StatAggregation> = (info) => ({
	type: 'object',
	properties: {
		base: number(),
		bonus: number(),
	},
	$uiWidget: Widgets.Stat,
	title: info?.title,
	description: info?.description,
	$uiCols: info?.cols,
	$aggregate: info?.aggregate,
	$defaultVisibleRoles: info?.defaultVisibleRoles,
});

export const richText: CBSchemaFunc<never> = (info) => ({
	type: 'object',
	properties: {
		document: genericObject(),
		documentVersion: string(),
	},
	$uiWidget: Widgets.RichText,
	title: info?.title,
	description: info?.description,
	$uiCols: info?.cols,
	$defaultVisibleRoles: info?.defaultVisibleRoles,
});

export const image: CBSchemaFunc<ImageAggregation> = (info) => ({
	type: 'object',
	properties: {
		url: string(),
	},
	$uiWidget: Widgets.Image,
	title: info?.title,
	description: info?.description,
	$uiCols: info?.cols,
	$aggregate: info?.aggregate,
	$defaultVisibleRoles: info?.defaultVisibleRoles,
});

export const arrayOf = {
	numbers: (info?: DisplayInfo) => _arrayOf(number(), info),
	strings: (info?: DisplayInfo) => _arrayOf(string(), info),
	booleans: (info?: DisplayInfo) => _arrayOf(boolean(), info),
	objects: (obj: { [k: string]: CampaignBuddySchema }, info?: DisplayInfo) =>
		_arrayOf(object(obj), info),
	entities: (ent: EntityDefinition, info?: DisplayInfo) =>
		_arrayOf(entity(ent), info),
	stats: (info?: DisplayInfo) => _arrayOf(stat(), info),
	richTexts: (info?: DisplayInfo) => _arrayOf(richText(), info),
	genericObjects: (info?: DisplayInfo) => _arrayOf(genericObject(), info),
	numericResources: (info?: DisplayInfo) => _arrayOf(numericResource(), info),
	custom: (obj: CampaignBuddySchema<any>, info?: DisplayInfo<any>) =>
		_arrayOf(obj, info),
};

const option: (
	info?: DisplayInfo<OptionAggregation>
) => CampaignBuddySchema<OptionAggregation> = (info) => ({
	type: 'object',
	properties: {
		displayValue: string(),
		id: string(),
	},
	title: info?.title,
	description: info?.description,
	$uiCols: info?.cols,
	$aggregate: info?.aggregate,
	$defaultVisibleRoles: info?.defaultVisibleRoles,
});

export const choice: (
	info?: DisplayInfoWithEnum<ChoiceAggregation>
) => CampaignBuddySchema<ChoiceAggregation> = (info) => ({
	type: 'object',
	properties: {
		options: _arrayOf(option()),
		selectedOption: option(),
	},
	$uiWidget: Widgets.Choice,
	title: info?.title,
	description: info?.description,
	$uiCols: info?.cols,
	$aggregate: info?.aggregate,
	$options: info?.options,
	$defaultVisibleRoles: info?.defaultVisibleRoles,
});

export const multiChoice: (
	info?: DisplayInfoWithEnum<MultiChoiceAggregation>
) => CampaignBuddySchema<MultiChoiceAggregation> = (info) => ({
	type: 'object',
	properties: {
		selectedOptions: _arrayOf(option()),
		options: _arrayOf(option()),
		maxChoices: number(),
	},
	$uiWidget: Widgets.MultiChoice,
	title: info?.title,
	description: info?.description,
	$uiCols: info?.cols,
	$aggregate: info?.aggregate,
	$options: info?.options,
	$defaultVisibleRoles: info?.defaultVisibleRoles,
});
