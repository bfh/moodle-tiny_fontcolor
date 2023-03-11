@editor @editor_tiny @tiny @tiny_bfhfontcolor
Feature: Tiny editor text color/text background color
  To format content in Tiny, I need to set text color/text background color.

  @javascript
  Scenario: Set a text color using the Text foreground color menu item
    Given the following config values are set as admin:
      | tinytextbackgroundcolors | [{"name":"Black","value":"000000"},{"name":"White","value":"ffffff"},{"name":"Yellow","value":"e2b007"},{"name":"rosa","value":"#ffccc0"}] | tiny_bfhfontcolor |
      | tinytextcolors | [{"name":"Normal","value":"#000000"},{"name":"Gray dark","value":"#ff000a"},{"name":"gray","value":"#ffccba"},{"name":"test1","value":"#fce34f"}] | tiny_bfhfontcolor |
    And I log in as "admin"
    And I open my profile in edit mode
    And I wait until the page is ready
    And I set the field "Description" to "<p>Some plain text</p><p>Some more text</p>"
    And I select the "p" element in position "1" of the "Description" TinyMCE editor
    And I click on the "Format > Text colour" menu item for the "Description" TinyMCE editor
    And I press "Update profile"
    Then I should see "Some plain text"

  @javascript
  Scenario: Set a text background color using the Text background color menu item
    Given the following config values are set as admin:
      | tinytextbackgroundcolors | [{"name":"Black","value":"000000"},{"name":"White","value":"ffffff"},{"name":"Yellow","value":"e2b007"},{"name":"rosa","value":"#ffccc0"}] | tiny_bfhfontcolor |
      | tinytextcolors | [{"name":"Normal","value":"#000000"},{"name":"Gray dark","value":"#ff000a"},{"name":"gray","value":"#ffccba"},{"name":"test1","value":"#fce34f"}] | tiny_bfhfontcolor |
    And I log in as "admin"
    And I open my profile in edit mode
    And I wait until the page is ready
    And I set the field "Description" to "<p>Some plain text</p><p>Some more text</p>"
    And I select the "p" element in position "1" of the "Description" TinyMCE editor
    And I click on the "Format > Background colour" menu item for the "Description" TinyMCE editor
    And I press "Update profile"
    Then I should see "Some plain text"

  @javascript
  Scenario: Set a text color using the Text foreground color menu button
    Given the following config values are set as admin:
      | tinytextbackgroundcolors | [{"name":"Black","value":"000000"},{"name":"White","value":"ffffff"},{"name":"Yellow","value":"e2b007"},{"name":"rosa","value":"#ffccc0"}] | tiny_bfhfontcolor |
      | tinytextcolors | [{"name":"Normal","value":"#000000"},{"name":"Gray dark","value":"#ff000a"},{"name":"gray","value":"#ffccba"},{"name":"test1","value":"#fce34f"}] | tiny_bfhfontcolor |
    And I log in as "admin"
    And I open my profile in edit mode
    And I wait until the page is ready
    And I set the field "Description" to "<p>Some plain text</p><p>Some more text</p>"
    And I select the "p" element in position "1" of the "Description" TinyMCE editor
    And I click on the "Text colour" button for the "Description" TinyMCE editor
    And I press "Update profile"
    Then I should see "Some plain text"

  @javascript
  Scenario: Set a text background color using the Text background color menu button
    Given the following config values are set as admin:
      | tinytextbackgroundcolors | [{"name":"Black","value":"000000"},{"name":"White","value":"ffffff"},{"name":"Yellow","value":"e2b007"},{"name":"rosa","value":"#ffccc0"}] | tiny_bfhfontcolor |
      | tinytextcolors | [{"name":"Normal","value":"#000000"},{"name":"Gray dark","value":"#ff000a"},{"name":"gray","value":"#ffccba"},{"name":"test1","value":"#fce34f"}] | tiny_bfhfontcolor |
    And I log in as "admin"
    And I open my profile in edit mode
    And I wait until the page is ready
    And I set the field "Description" to "<p>Some plain text</p><p>Some more text</p>"
    And I select the "p" element in position "1" of the "Description" TinyMCE editor
    And I click on the "Background colour" button for the "Description" TinyMCE editor
    And I press "Update profile"
    Then I should see "Some plain text"
