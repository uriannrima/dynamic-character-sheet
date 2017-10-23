var SubValueModule = require('./sub-value.module');

exports.FEAT_TYPES = [
    "General",
    "Item Creation",
    "Reserve",
    "Metamagic"
];

exports.Feat = function ({ _id, title, benefit, type, prerequisite, normal, special, unique, hasSubValue, subValue }) {
    return {
        _id,
        title,
        benefit,
        type,
        prerequisite,
        normal,
        special,
        unique: unique || true,
        hasSubValue,
        subValue: subValue ? new SubValueModule.SubValue(subValue) : new SubValueModule.SubValue({})
    }
}