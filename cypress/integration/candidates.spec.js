/*
	Tests the website's primary features through the user interface.
	To run: $ npx cypress open
*/

const SEARCH_USER = {
	username: "Search User",
	email: "search@example.com",
	address: "Search Street 1",
	age: 20,
	status: "Given offer",
}

const ADD_USER = {
	username: "Add User",
	email: "add@example.com",
	address: "Add Street 1",
	age: 30,
	status: "In dialog",
}

const EDIT_USER = {
	username: "Edit User",
	email: "edit@example.com",
	address: "Edit Street 1",
	age: 50,
	status: "In dialog",
}

const UPDATED_USER = {
	username: "Updated User",
	email: "updated@example.com",
	address: "Updated Street 1",
	age: 40,
	status: "Closed",
}

const DELETED_USER = {
	username: "Deleted User",
	email: "deleted@example.com",
	address: "Deleted Street 1",
	age: 60,
	status: "Given offer",
}

describe('handle candidates', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	afterEach(() => {
		cy.get('[data-cy=searchbar]').clear();
	})

	it('displays a list of candidates', () => {
		cy.get('[data-cy=wrapper-row]').should('have.length.at.least', 50);
	});

	it('can add a candidate', () => {
		cy.get('[data-cy=btn-add-candidate]').click();

		// Try submitting without entering data
		cy.get('[data-cy=btn-confirm-add-candidate]').click();
		cy.get('[data-cy=overlay-add-candidate]').should('be.visible');
		
		// Add proper data
		cy.get('[name=name]').type(ADD_USER.username);
		cy.get('[name=address]').type(ADD_USER.address);
		cy.get('[name=age]').type(ADD_USER.age);
		cy.get('[name=status]').select(ADD_USER.status);

		// Try submitting with bad e-mail
		cy.get('[name=email]').type(1);
		cy.get('[data-cy=btn-confirm-add-candidate]').click();
		cy.get('[data-cy=overlay-add-candidate]').should('be.visible');
		cy.get('[name=email]').clear().type('test@');
		cy.get('[data-cy=btn-confirm-add-candidate]').click();
		cy.get('[data-cy=overlay-add-candidate]').should('be.visible');
		cy.get('[name=email]').clear().type('@test.');
		cy.get('[data-cy=btn-confirm-add-candidate]').click();
		cy.get('[data-cy=overlay-add-candidate]').should('be.visible');

		// Try submitting with bad age
		cy.get('[name=email]').clear().type(ADD_USER.email);
		cy.get('[name=age]').clear().type('test');
		cy.get('[data-cy=btn-confirm-add-candidate]').click();
		cy.get('[data-cy=overlay-add-candidate]').should('be.visible');

		// Try submitting good data
		cy.get('[name=age]').clear().type(ADD_USER.age);
		cy.get('[data-cy=btn-confirm-add-candidate]').click();
		cy.get('[data-cy=overlay-has-added-candidate]').should('be.visible');
	});
	
	it('can search for candidates', () => {
		// Add a candidate to search for
		cy.get('[data-cy=btn-add-candidate]').click();
		cy.get('[name=name]').type(SEARCH_USER.username);
		cy.get('[name=email]').type(SEARCH_USER.email);
		cy.get('[name=address]').type(SEARCH_USER.address);
		cy.get('[name=age]').type(SEARCH_USER.age);
		cy.get('[name=status]').select(SEARCH_USER.status);
		cy.get('[data-cy=btn-confirm-add-candidate]').click();

		// Search with username
		cy.get('[data-cy=searchbar]').type(SEARCH_USER.username);
		cy.get('[data-cy=wrapper-row]').should('have.length', 1);
		cy.get('[data-cy=row-username]').should('contain', SEARCH_USER.username);

		// Search with email
		cy.get('[data-cy=searchbar]').clear().type(SEARCH_USER.email);
		cy.get('[data-cy=wrapper-row]').should('have.length', 1);
		cy.get('[data-cy=row-username]').should('contain', SEARCH_USER.username);

		// Search with address
		cy.get('[data-cy=searchbar]').clear().type(SEARCH_USER.address);
		cy.get('[data-cy=wrapper-row]').should('have.length', 1);
		cy.get('[data-cy=row-username]').should('contain', SEARCH_USER.username);

		// Search with age
		cy.get('[data-cy=searchbar]').clear().type(SEARCH_USER.age);
		cy.get('[data-cy=wrapper-row]').should('have.length.at.least', 1);
		
		// Search with status
		cy.get('[data-cy=searchbar]').clear().type(SEARCH_USER.status);
		cy.get('[data-cy=wrapper-row]').should('have.length.at.least', 1);
	});

	it('can edit candidates', () => {
		// Add a candidate to edit
		cy.get('[data-cy=btn-add-candidate]').click();
		cy.get('[name=name]').type(EDIT_USER.username);
		cy.get('[name=email]').type(EDIT_USER.email);
		cy.get('[name=address]').type(EDIT_USER.address);
		cy.get('[name=age]').type(EDIT_USER.age);
		cy.get('[name=status]').select(EDIT_USER.status);
		cy.get('[data-cy=btn-confirm-add-candidate]').click();

		// Find the candidate to edit
		cy.get('[data-cy=searchbar]').type(EDIT_USER.username);
		cy.get('[data-cy=wrapper-row]').click();
		cy.get('[data-cy=btn-edit-candidate]').click();
		
		// Confirm without editing
		cy.get('[data-cy=btn-confirm-edits]').click();
		cy.get('[data-cy=row-username]').should('contain', EDIT_USER.username);
		cy.contains(EDIT_USER.email);
		cy.contains(EDIT_USER.address);
		cy.contains(EDIT_USER.age);
		cy.contains(EDIT_USER.status);
		
		// Clear existing information
		cy.get('[data-cy=btn-edit-candidate]').click();
		cy.get('[name=name]').clear();
		cy.get('[name=email]').clear();
		cy.get('[name=address]').clear();
		cy.get('[name=age]').clear();

		// Add new user information
		cy.get('[name=name]').type(UPDATED_USER.username);
		cy.get('[name=address]').type(UPDATED_USER.address);
		cy.get('[name=age]').type(UPDATED_USER.age);
		cy.get('[name=status]').select(UPDATED_USER.status);

		// Try submitting with bad e-mail
		cy.get('[name=email]').type(1);
		cy.get('[data-cy=btn-confirm-edits]').click();
		cy.contains('Confirm');
		cy.get('[name=email]').clear().type('test@');
		cy.get('[data-cy=btn-confirm-edits]').click();
		cy.contains('Confirm');

		// Try submitting with bad age
		cy.get('[name=email]').clear().type(UPDATED_USER.email);
		cy.get('[name=age]').clear().type('test');
		cy.get('[data-cy=btn-confirm-edits]').click();
		cy.contains('Confirm');

		// Try submitting good data
		cy.get('[name=age]').clear().type(UPDATED_USER.age);
		cy.get('[data-cy=btn-confirm-edits]').click();

		// Find the updated user
		cy.get('[data-cy=searchbar]').clear().type(UPDATED_USER.username);
		cy.get('[data-cy=wrapper-row]').click();

		// Verify that the information has been updated
		cy.get('[data-cy=row-username]').should('contain', UPDATED_USER.username);
		cy.contains(UPDATED_USER.email);
		cy.contains(UPDATED_USER.address);
		cy.contains(UPDATED_USER.age);
		cy.contains(UPDATED_USER.status);
	});

	it('can delete candidates', () => {
		// Add a candidate to delete
		cy.get('[data-cy=btn-add-candidate]').click();
		cy.get('[name=name]').type(DELETED_USER.username);
		cy.get('[name=email]').type(DELETED_USER.email);
		cy.get('[name=address]').type(DELETED_USER.address);
		cy.get('[name=age]').type(DELETED_USER.age);
		cy.get('[name=status]').select(DELETED_USER.status);
		cy.get('[data-cy=btn-confirm-add-candidate]').click();

		// Find the candidate to delete
		cy.get('[data-cy=searchbar]').type(DELETED_USER.username);
		cy.get('[data-cy=wrapper-row]').click();
		cy.get('[data-cy=btn-delete-candidate]').click();
		cy.get('[data-cy=btn-confirm-delete-candidate]').click();

		// Ensure that the candidate is no longer found
		cy.get('[data-cy=no-candidates]').should('be.visible');
	});
});