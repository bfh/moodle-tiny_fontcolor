@editor @editor_tiny @tiny @tiny_bfhfontcolor
Feature: Tiny editor text color/text background color
  To format content in Tiny, I need to set text color/text background color.

  @javascript
  Scenario: Set a text color using the Text foreground color menu item
    Given I log in as "admin"
    And I open my profile in edit mode
    And I wait until the page is ready
    And I set the field "Description" to "<p>Some plain text</p><p>Some more text</p>"
    And I select the "p" element in position "1" of the "Description" TinyMCE editor
    And I click on the "Format > Text foreground color" menu item for the "Description" TinyMCE editor
    And I press "Update profile"
    Then I should see "Some plain text"

  @javascript
  Scenario: Set a text background color using the Text background color menu item
    Given I log in as "admin"
    And I open my profile in edit mode
    And I wait until the page is ready
    And I set the field "Description" to "<p>Some plain text</p><p>Some more text</p>"
    And I select the "p" element in position "1" of the "Description" TinyMCE editor
    And I click on the "Format > Text background color" menu item for the "Description" TinyMCE editor
    And I press "Update profile"
    Then I should see "Some plain text"

  @javascript
  Scenario: Set a text color using the Text foreground color menu button
    Given I log in as "admin"
    And I open my profile in edit mode
    And I wait until the page is ready
    And I set the field "Description" to "<p>Some plain text</p><p>Some more text</p>"
    And I select the "p" element in position "1" of the "Description" TinyMCE editor
    And I click on the "Text foreground color" button for the "Description" TinyMCE editor
    And I press "Update profile"
    Then I should see "Some plain text"

  @javascript
  Scenario: Set a text background color using the Text background color menu button
    Given I log in as "admin"
    And I open my profile in edit mode
    And I wait until the page is ready
    And I set the field "Description" to "<p>Some plain text</p><p>Some more text</p>"
    And I select the "p" element in position "1" of the "Description" TinyMCE editor
    And I click on the "Text background color" button for the "Description" TinyMCE editor
    And I press "Update profile"
    Then I should see "Some plain text"
