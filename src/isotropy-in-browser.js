/* @flow */
import getIsotropy from "isotropy-core";
import urlMiddleware from "isotropy-middleware-url";
import bodyMiddleware from "isotropy-middleware-body";
import webappPlugin from "isotropy-plugin-webapp";
//import graphqlPlugin from "isotropy-plugin-graphql";
//import reactPlugin from "isotropy-plugin-react";

import Router from "isotropy-router";
import type { IsotropyOptionsType, IsotropyResultType } from "isotropy-core";
import type { IncomingMessage, ServerResponse, Server } from "./flow/http";

type IsotropyFnType = (apps: Object, options: IsotropyOptionsType) => Promise<IsotropyResultType>;

const isotropy: IsotropyFnType = getIsotropy({
  webapp: webappPlugin,
  // graphql: graphqlPlugin,
  // react: reactPlugin
});

export default async function(apps: Object, options: IsotropyOptionsType) : Promise<IsotropyResultType> {
  options.handler = (router: Router) => (req: IncomingMessage, res: ServerResponse) => {
    urlMiddleware(req, res)
    .then(() => bodyMiddleware(req, res))
    .then(() => router.doRouting(req, res));
  };
  return await isotropy(apps, options);
};