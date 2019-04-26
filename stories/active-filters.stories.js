import React from "react";
import { storiesOf } from "@storybook/react";
import { Elasticsearch, SearchBox, Results, ActiveFilters, Facet } from "../src";
import { url } from "./utils";

storiesOf("ActiveFilters", module).add("active", () => {
  return (
    <Elasticsearch url={url}>
      <h1>Display active filters</h1>
      <pre>{`<ActiveFilters id="active-filters" />`}</pre>
      Active Filters:
      <ActiveFilters id="af" />
      <SearchBox id="main" fields={["TICO"]} initialValue={"chemin"} />
      <Facet id="autr" fields={["AUTR.keyword"]} initialValue={["auteur inconnu"]}/>
      <Results
        id="result"
        item={s => (
          <div>
            {s.TICO} - {s.AUTR}
          </div>
        )}
        pagination={() => <></>}
      />
    </Elasticsearch>
  );
});