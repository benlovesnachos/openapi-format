const {isObject, isArray, isString} = require("./util-types");
const {
  camelCase,
  pascalCase,
  kebabCase,
  trainCase,
  snakeCase,
  adaCase,
  constantCase,
  cobolCase,
  dotNotation,
  spaceCase,
  capitalCase,
  lowerCase,
  upperCase
} = require("case-anything");

/**
 * Determines whether Change casing should be performed based on whether the parameters are set or not.
 * @param casingSet The casing options.
 * @returns {*}
 */
function changeComponentParametersCasingEnabled(casingSet){
  return casingSet && (
    casingSet.componentsParametersHeader ||
    casingSet.componentsParametersPath ||
    casingSet.componentsParametersQuery ||
    casingSet.componentsParametersCookie
  )
}

/**
 * Determines whether Change casing should be performed based on whether the parameters are set or not.
 * @param casingSet The casing options.
 * @returns {*}
 */
function changeParametersCasingEnabled(casingSet){
  return casingSet && (
    casingSet.parametersHeader ||
    casingSet.parametersPath ||
    casingSet.parametersQuery ||
    casingSet.parametersCookie
  )
}


/**
 * Change Object keys case function
 * @param {object} obj
 * @param {string} caseType
 * @returns {*}
 */
function changeObjKeysCase(obj, caseType) {
  if (!isObject(obj)) return obj

  const orgObj = JSON.parse(JSON.stringify(obj)); // Deep copy of the object
  let replacedItems = Object.keys(orgObj).map((key) => {
    const newKey = changeCase(key, caseType);
    return {[newKey]: orgObj[key]};
  });
  return Object.assign({}, ...replacedItems)
}

/**
 * Change object keys case in array function
 * @param {object} node
 * @param {string} caseType
 * @returns {*}
 */
function changeArrayObjKeysCase(node, caseType) {
  if (!isArray(node)) return node

  const casedNode = JSON.parse(JSON.stringify(node)); // Deep copy of the schema object
  for (let i = 0; i < casedNode.length; i++) {
    casedNode[i] = changeObjKeysCase(casedNode[i], caseType)
  }
  return casedNode
}

/**
 * Change case function
 * @param {string} valueAsString
 * @param {string} caseType
 * @returns {string}
 */
function changeCase(valueAsString, caseType) {
  if (!isString(valueAsString) || valueAsString === "") return valueAsString
  const keepChars = ['$', '@']
  const normCaseType = camelCase(caseType)

  // BUG underscores are stripped from the beginning of values
  let prepend = valueAsString.startsWith("_", 0) ? '_' : ''

  switch (normCaseType) {
    case "camelCase":
      return prepend.concat(camelCase(valueAsString, {keep: keepChars}))
    case "pascalCase":
    case "upperCamelCase":
      return prepend.concat(pascalCase(valueAsString, {keep: keepChars}))
    case "kebabCase":
    case "kebapCase":
      return prepend.concat(kebabCase(valueAsString, {keep: keepChars}))
    case "trainCase":
    case "capitalKebabCase":
    case "capitalKebapCase":
      return prepend.concat(trainCase(valueAsString, {keep: keepChars}))
    case "snakeCase":
      return prepend.concat(snakeCase(valueAsString, {keep: keepChars}))
    case "adaCase":
      return prepend.concat(adaCase(valueAsString, {keep: keepChars}))
    case "constantCase":
      return prepend.concat(constantCase(valueAsString, {keep: keepChars}))
    case "cobolCase":
      return prepend.concat(cobolCase(valueAsString, {keep: keepChars}))
    case "dotNotation":
      return prepend.concat(dotNotation(valueAsString, {keep: keepChars}))
    case "spaceCase":
      return prepend.concat(spaceCase(valueAsString, {keep: keepChars}))
    case "capitalCase":
      return prepend.concat(capitalCase(valueAsString, {keep: keepChars}))
    case "lowerCase":
      return prepend.concat(lowerCase(valueAsString, {keep: keepChars}))
    case "upperCase":
      return prepend.concat(upperCase(valueAsString, {keep: keepChars}))
    default:
      return valueAsString
  }
}

module.exports = {
  changeComponentParametersCasingEnabled:changeComponentParametersCasingEnabled,
  changeParametersCasingEnabled:changeParametersCasingEnabled,
  changeObjKeysCase:changeObjKeysCase,
  changeArrayObjKeysCase:changeArrayObjKeysCase,
  changeCase:changeCase
};
