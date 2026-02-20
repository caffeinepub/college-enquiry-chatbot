import Map "mo:core/Map";
import Text "mo:core/Text";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

actor {
  public type College = {
    id : Nat;
    name : Text;
    description : Text;
    admissionsRequirements : Text;
    courses : [Text];
    programs : [Text];
    campusFacilities : Text;
    campusLife : Text;
    applicationDeadlines : Text;
    tuitionFees : Text;
    scholarships : Text;
    contactInfo : Text;
    faq : [{ question : Text; answer : Text }];
  };

  public type Query = {
    userId : Principal;
    question : Text;
    collegeId : Nat;
  };

  public type Response = {
    answer : Text;
    collegeId : Nat;
    userQuery : Query;
  };

  var nextCollegeId = 0;
  let colleges = Map.empty<Nat, College>();
  let userHistory = Map.empty<Principal, List.List<Query>>();

  // Add new college information
  public shared ({ caller }) func addCollege(
    name : Text,
    description : Text,
    admissionsRequirements : Text,
    courses : [Text],
    programs : [Text],
    campusFacilities : Text,
    campusLife : Text,
    applicationDeadlines : Text,
    tuitionFees : Text,
    scholarships : Text,
    contactInfo : Text,
    faq : [{ question : Text; answer : Text }]
  ) : async Nat {
    let collegeId = nextCollegeId;
    let college = {
      id = collegeId;
      name;
      description;
      admissionsRequirements;
      courses;
      programs;
      campusFacilities;
      campusLife;
      applicationDeadlines;
      tuitionFees;
      scholarships;
      contactInfo;
      faq;
    };
    colleges.add(collegeId, college);
    nextCollegeId += 1;
    collegeId;
  };

  // Get college by id
  public query ({ caller }) func getCollege(id : Nat) : async College {
    switch (colleges.get(id)) {
      case (null) { Runtime.trap("College not found") };
      case (?college) { college };
    };
  };

  // Search colleges by name
  public query ({ caller }) func searchCollegesByName(searchText : Text) : async [College] {
    let resultsList = List.empty<College>();
    for ((_, college) in colleges.entries()) {
      if (college.name.contains(#text (searchText))) {
        resultsList.add(college);
      };
    };
    resultsList.reverse().toArray();
  };

  // Search colleges by program
  public query ({ caller }) func searchCollegesByProgram(searchText : Text) : async [College] {
    let resultsList = List.empty<College>();
    for ((_, college) in colleges.entries()) {
      for (program in college.programs.values()) {
        if (program.contains(#text (searchText))) {
          resultsList.add(college);
        };
      };
    };
    resultsList.reverse().toArray();
  };

  // Ask a question related to a specific college
  public shared ({ caller }) func askQuestion(question : Text, collegeId : Nat) : async Response {
    let userQuery : Query = {
      userId = caller;
      question;
      collegeId;
    };

    // Save user history
    let currentHistory = switch (userHistory.get(caller)) {
      case (null) { List.empty<Query>() };
      case (?history) { history };
    };
    currentHistory.add(userQuery);
    userHistory.add(caller, currentHistory);

    // Find answer from college FAQ
    let college = switch (colleges.get(collegeId)) {
      case (null) { Runtime.trap("College not found") };
      case (?c) { c };
    };

    for (faq in college.faq.values()) {
      if (
        question.toLower().contains(#text (faq.question.toLower())) or
        faq.question.toLower().contains(#text (question.toLower()))
      ) {
        return {
          answer = faq.answer;
          collegeId;
          userQuery;
        };
      };
    };

    {
      answer = "Sorry, we couldn't find an answer to your question. Please try rephrasing.";
      collegeId;
      userQuery;
    };
  };

  // Get user question history
  public query ({ caller }) func getUserHistory(userId : Principal) : async [Query] {
    switch (userHistory.get(userId)) {
      case (null) { [] };
      case (?history) { history.reverse().toArray() };
    };
  };

  // Delete user question history
  public shared ({ caller }) func deleteUserHistory() : async () {
    userHistory.remove(caller);
  };

  // Get all colleges
  public query ({ caller }) func getAllColleges() : async [College] {
    colleges.values().toArray();
  };
};
