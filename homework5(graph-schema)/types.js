const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} = require('graphql');

let {items} = require('./data.js');

const _ = require('lodash');

userType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
    }
})

itemType = new GraphQLObjectType({
    name: 'Item',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        price: {type: GraphQLInt},
        description: { type: GraphQLString },
        categoryId: { type: GraphQLInt }
    }
})

categoryType = new GraphQLObjectType({
    name: 'Category',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        items: {
            type: new GraphQLList(itemType),
            resolve(source, args) {
                return _.filter(items, { categoryId: source.id });
            }
        }
    }
});

exports.userType = userType;
exports.categoryType = categoryType;
exports.itemType = itemType;

