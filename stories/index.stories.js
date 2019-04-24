import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import {
  Elasticsearch,
  SearchBox,
  Facet,
  Results,
  toUrlQueryString,
  fromUrlQueryString
} from "../src";
import { customQuery, url } from "./utils";

function WithUrlParams() {
  const [queryString, setQueryString] = useState("");
  return (
    <Elasticsearch
      url={url}
      onChange={params => { setQueryString(toUrlQueryString(params))}}
      defaultParams={fromUrlQueryString("main=%22bourg%22")}
    >
      <div>Params: {queryString}</div>

      <SearchBox id="main" customQuery={customQuery} />
      <hr />
      <Results item={(s, _, id) => <div key={id}>{s.TICO}</div>} />
    </Elasticsearch>
  );
}

storiesOf("Elasticsearch", module)
  .add("basic usage", () => {
    return (
      <Elasticsearch url={url}>
        <SearchBox id="main" customQuery={customQuery} />
        <div style={{ display: "inline-block" }}>
          <Facet id="author" fields={["AUTR.keyword"]} />
        </div>
        <div style={{ display: "inline-block" }}>
          <Facet id="domn" fields={["DOMN.keyword"]} />
        </div>
        <Results
          item={(source, score, id) => (
            <div key={id}>
              <b>{source.TICO}</b> - score: {score}
            </div>
          )}
        />
      </Elasticsearch>
    );
  })
  .add("with url params", () => <WithUrlParams />);
