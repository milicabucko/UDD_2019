package com.ebookrepositoryserver.controller;

import java.util.ArrayList;
import java.util.List;

import com.ebookrepositoryserver.model.ScientificWork;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ebookrepositoryserver.lucene.model.AdvancedQuery;
import com.ebookrepositoryserver.lucene.model.RequiredHighlight;
import com.ebookrepositoryserver.lucene.model.SearchType;
import com.ebookrepositoryserver.lucene.model.SimpleQuery;
import com.ebookrepositoryserver.lucene.search.QueryBuilder;
import com.ebookrepositoryserver.lucene.search.ResultRetriever;

@RestController
@RequestMapping("/api/search")
@CrossOrigin(origins = "http://localhost:4200")
public class SearchController {

	private final ResultRetriever resultRetriever;

	public SearchController(ResultRetriever resultRetriever) {
		this.resultRetriever = resultRetriever;
	}

	@PostMapping(value = "/term", consumes = "application/json")
	public ResponseEntity<List<ScientificWork>> searchTermQuery(@RequestBody SimpleQuery simpleQuery) throws Exception {
		org.elasticsearch.index.query.QueryBuilder query = QueryBuilder.buildQuery(SearchType.regular,
				simpleQuery.getField(), simpleQuery.getValue());
		List<RequiredHighlight> rh = new ArrayList<RequiredHighlight>();
		rh.add(new RequiredHighlight(simpleQuery.getField(), simpleQuery.getValue()));
		List<ScientificWork> results = resultRetriever.getResults(query, rh);
		return new ResponseEntity<List<ScientificWork>>(results, HttpStatus.OK);
	}

	@PostMapping(value = "/fuzzy", consumes = "application/json")
	public ResponseEntity<List<ScientificWork>> searchFuzzy(@RequestBody SimpleQuery simpleQuery) throws Exception {
		org.elasticsearch.index.query.QueryBuilder query = QueryBuilder.buildQuery(SearchType.fuzzy,
				simpleQuery.getField(), simpleQuery.getValue());
		List<RequiredHighlight> rh = new ArrayList<RequiredHighlight>();
		rh.add(new RequiredHighlight(simpleQuery.getField(), simpleQuery.getValue()));
		List<ScientificWork> results = resultRetriever.getResults(query, rh);
		return new ResponseEntity<List<ScientificWork>>(results, HttpStatus.OK);
	}

	@PostMapping(value = "/phrase", consumes = "application/json")
	public ResponseEntity<List<ScientificWork>> searchPhrase(@RequestBody SimpleQuery simpleQuery) throws Exception {
		org.elasticsearch.index.query.QueryBuilder query = QueryBuilder.buildQuery(SearchType.phrase,
				simpleQuery.getField(), simpleQuery.getValue());
		List<RequiredHighlight> rh = new ArrayList<RequiredHighlight>();
		rh.add(new RequiredHighlight(simpleQuery.getField(), simpleQuery.getValue()));
		List<ScientificWork> results = resultRetriever.getResults(query, rh);
		return new ResponseEntity<List<ScientificWork>>(results, HttpStatus.OK);
	}

	@PostMapping(value = "/boolean", consumes = "application/json")
	public ResponseEntity<List<ScientificWork>> searchBoolean(@RequestBody AdvancedQuery advancedQuery) throws Exception {
		org.elasticsearch.index.query.QueryBuilder query1 = QueryBuilder.buildQuery(SearchType.regular,
				advancedQuery.getField1(), advancedQuery.getValue1());
		org.elasticsearch.index.query.QueryBuilder query2 = QueryBuilder.buildQuery(SearchType.regular,
				advancedQuery.getField2(), advancedQuery.getValue2());

		BoolQueryBuilder builder = QueryBuilders.boolQuery();
		if (advancedQuery.getOperation().equalsIgnoreCase("AND")) {
			builder.must(query1);
			builder.must(query2);
		} else if (advancedQuery.getOperation().equalsIgnoreCase("OR")) {
			builder.should(query1);
			builder.should(query2);
		} else if (advancedQuery.getOperation().equalsIgnoreCase("NOT")) {
			builder.must(query1);
			builder.mustNot(query2);
		}

		List<RequiredHighlight> rh = new ArrayList<RequiredHighlight>();
		rh.add(new RequiredHighlight(advancedQuery.getField1(), advancedQuery.getValue1()));
		rh.add(new RequiredHighlight(advancedQuery.getField2(), advancedQuery.getValue2()));
		List<ScientificWork> results = resultRetriever.getResults(builder, rh);
		return new ResponseEntity<List<ScientificWork>>(results, HttpStatus.OK);
	}
}
