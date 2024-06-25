# Ubiquitous Sniffle

A fork of [Axis code test](https://github.com/liljaTobias/axis-code-test)

## Getting started

This is a monorepo with two packages, `backend` and `frontend`, using npm workspaces.

### Prerequisites

The project requires Node `^21`.

With `nvm` installed you can simply run `nvm use`

### Start dev eniroment

1. `npm install`
2. `npm run dev` to start both backend and frontend.
3. Access GraphQL-devtool on http://localhost:4000/graphql

## Task 1: Extending the GraphQL Server with more types

### Objectives

- Extend the existing GraphQL server to map Users to specific Cameras.
  - Keep in mind that you should be able to log in using a User in Task 2.
- Add funtionality to add a camera to a User
- Add funtionality to remove a camera from a User

## Task 2: Create a React app that consumes the previous GraphQL-API

### Requirements

- React
- Typescript
- Urql
- Fluent UI v9

### Objective

Create a React app in the "frontend"-package that displays all cameras related to the currently logged in user. Use the API you've extended in task 1.
