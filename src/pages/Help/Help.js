import React from "react";
import "./Help.css";
import { Accordion } from "react-bootstrap";

function Help() {
	document.title = "Help! | RecipeKeeper";
	return (
		<Accordion defaultActiveKey={[""]} alwaysOpen="false">
			<Accordion.Item eventKey="0">
				<Accordion.Header>Adding New Recipes</Accordion.Header>
				<Accordion.Body>
					<ol>
						<li>
							Click on "Add Recipe" in the navigation bar or the
							"Add Recipe" button on the main page.
						</li>
						<br />
						<img
							src="../../assets/AddRecipeNavigation.png"
							alt=""
						/>
						<br />
						<small>Adding a recipe from the navigation bar.</small>
						<br />
						<br />
						<img src="../../assets/AddRecipeHome.png" alt="" />
						<br />
						<small>Adding a recipe from the Home Page.</small>
						<br />
						<br />
						<li>
							Fill out the administrative details of the recipe in
							the top section. All of these fields are{" "}
							<span className="underline bold red">required</span>
							. <br />
							<br />
							<img src="../../assets/AdminSection.png" alt="" />
							<br />
							<small>
								Recipe Header Details - Required Fields
							</small>
							<br />
							<br />
							<ul>
								<li>
									<span className="bold underline">
										Recipe Title
									</span>
									: A title to identify the recipe. This is
									used by the "Search Recipes" feature.
								</li>
								<li>
									<span className="bold underline">
										Author
									</span>
									: The person who created the recipe.
								</li>
								<li>
									<span className="bold underline">
										Difficulty
									</span>
									: How challenging the recipe is to make.
									Options include easy, medium, and hard.
								</li>
								<li>
									<span className="bold underline">
										Time Amount
									</span>
									: The numeric amount of time required to
									comlete the recipe, such as{" "}
									<span className="bold underline">30</span>{" "}
									in "30 Minutes".
								</li>
								<li>
									<span className="bold underline">
										Time Units
									</span>
									: The units of time required to complete the
									recipe, such as{" "}
									<span className="bold underline">
										Minutes
									</span>{" "}
									in "30 Minutes".
								</li>
							</ul>
						</li>
						<br />
						<li>
							Enter in all of the ingredients for the recipe. All
							of the ingredient fields are optional.
						</li>
						<br />
						<img src="../../assets/IngredientSection.png" alt="" />
						<br />
						<small>Ingredient Section - All Fields Optional</small>
						<br />
						<br />
						<ul>
							<li>
								<span className="bold underline">Count</span>:
								The quantity of an ingredient such as{" "}
								<span className="bold underline">2</span> in "2
								tomatoes".
							</li>
							<li>
								<span className="bold underline">Volume</span>:
								The numeric part of a measurement for an
								ingredient such as{" "}
								<span className="bold underline">16</span> in
								"16 Ounces".
							</li>
							<li>
								<span className="bold underline">Units</span>:
								The unit of measure for an ingredient such as{" "}
								<span className="bold underline">Ounces</span>{" "}
								in "16 Ounces".
							</li>
							<li>
								<span className="bold underline">
									Container
								</span>
								: The type of container that an ingredient
								usually comes in, such as{" "}
								<span className="bold underline">Box</span> in
								"1 Box Macaroni Noodles".
							</li>
							<li>
								<span className="bold underline">
									Ingredient
								</span>
								: The text description of the ingredient. For
								example,{" "}
								<span className="bold underline">
									Macaroni Noodles
								</span>{" "}
								in "1 Box Macaroni Noodles".
							</li>
							<li>
								<span className="bold underline">
									Add New Ingredient
								</span>
								: Press the "Add New Ingredient" button in the
								lower left corner of the ingredients section to
								add a new ingredient row.
							</li>
							<li>
								<span className="bold underline">
									Delete Ingredient
								</span>
								: Press the "Delete" button to the right of the
								ingredient to remove it.
							</li>
						</ul>
						<br />
						<li>Enter all of the instructions for the recipe.</li>
						<br />
						<img src="../../assets/InstructionSection.png" alt="" />
						<br />
						<small>Instruction Section - All Fields Optional</small>
						<br />
						<br />
						<ul>
							<li>
								<span className="bold underline">Step</span>:
								The number of the instruction step. This field
								is automatically generated.
							</li>
							<li>
								<span className="bold underline">
									Instruction
								</span>
								: The description of the actions to be performed
								during this step of the recipe.
							</li>
							<li>
								<span className="bold underline">
									Add New Instruction
								</span>
								: Press the "Add New Instruction" button in the
								lower left corner of the instructions section to
								add a new instruction row.
							</li>
							<li>
								<span className="bold underline">
									Delete Instruction
								</span>
								: Press the "Delete" button to the right of the
								instruction to remove it.
							</li>
						</ul>
					</ol>
				</Accordion.Body>
			</Accordion.Item>
			<Accordion.Item eventKey="1">
				<Accordion.Header>Finding Recipes</Accordion.Header>
				<Accordion.Body>
					<p>There are three primary ways to find recipes:</p>
					<ol>
						<li>Using the "Search Recipes" feature.</li>
						<br />
						<img src="../../assets/SearchFeature.png" alt="" />
						<br />
						<small>Searching By Recipe Title</small>
						<br />
						<br />
						<ul>
							<li>
								The search field is in the navigation bar on
								every page and compares the search query against
								Recipe Titles.
							</li>
							<li>
								Search is not case-sensitive and can do partial
								matches.
							</li>
						</ul>
						<br />
						<li>Using the "My Recipes" link.</li>
						<br />
						<img src="../../assets/MyRecipesLink.png" alt="" />
						<br />
						<small>My Recipes - Navigation Link</small>
						<br />
						<br />
						<img src="../../assets/MyRecipesHome.png" alt="" />
						<br />
						<small>My Recipes - Home Page</small>
						<br />
						<br />
						<ul>
							<li>
								The My Recipes link in the navigation bar or the
								My Recipes button on the home page will display
								a list of all recipes in alphabetical order.
							</li>
							<li>
								Using this method, finding a recipe may require
								some scrolling.
							</li>
						</ul>
						<br />
						<li>
							<span className="red bold underline">Advanced</span>
							: Using the Address Bar.
						</li>
						<br />
						<img src="../../assets/UrlSearch.png" alt="" />
						<br />
						<small>URL Search - Advanced</small>
						<br />
						<br />
						<ul>
							<li>
								To do a search from the address bar, text can be
								entered after{" "}
								<code>http://localhost:3000/MyRecipes/</code>
							</li>
							<li>
								For example,{" "}
								<code>
									http://localhost:3000/MyRecipes/cookie
								</code>{" "}
								should find "Grandma's Cookies".
							</li>
						</ul>
					</ol>
				</Accordion.Body>
			</Accordion.Item>
			<Accordion.Item eventKey="2">
				<Accordion.Header>Using Recipes</Accordion.Header>
				<Accordion.Body>
					<ul>
						<li>
							The Ingredients and Instructions sections have
							buttons for keeping track of ingredients and steps
							completed.
						</li>
						<br />
						<li>
							Clicking the green check mark button will put a line
							through the text.
						</li>
						<br />
						<li>
							Clicking the red "x" button will remove the line
							through the text.
						</li>
						<br />
						<img
							src="../../assets/StrikethroughButtons.png"
							alt=""
						/>
						<br />
						<small>Strikethrough Buttons</small>
						<br />
						<br />
						<li>
							Some of our users like to cross off ingredients as
							they are gathered to the workspace and others like
							to cross them off as the ingredients are used. Feel
							free to experiment!
						</li>
					</ul>
				</Accordion.Body>
			</Accordion.Item>
			<Accordion.Item eventKey="3">
				<Accordion.Header>Editing Recipes</Accordion.Header>
				<Accordion.Body>
					<ol>
						<li>
							First, navigate to the recipe using your favorite
							method.
						</li>
						<br />
						<img src="../../assets/EditButton.png" alt="" />
						<br />
						<small>The Edit and Delete Buttons</small>
						<br />
						<br />
						<li>
							Press the blue "Edit" button in the lower left
							corner of the recipe detail view.
						</li>
						<li>
							Make any edits that are necessary and when finished
							press the "Update" button.
						</li>
						<li>
							To cancel an unintentional edit, press the "Cancel"
							button.
						</li>
						<br />
						<img src="../../assets/UpdateButton.png" alt="" />
						<br />
						<small>The Update and Cancel Buttons</small>
						<br />
						<br />
					</ol>
				</Accordion.Body>
			</Accordion.Item>
			<Accordion.Item>
				<Accordion.Header>Deleting Recipes</Accordion.Header>
				<Accordion.Body>
					<ol>
						<li>
							First, navigate to the recipe using your favorite
							method.
						</li>
						<br />
						<img src="../../assets/EditButton.png" alt="" />
						<br />
						<small>The Edit and Delete Buttons</small>
						<br />
						<br />
						<li>
							Press the red "Delete" button in the lower left
							corner of the recipe detail view.
						</li>
						<li>
							Confirm the deletion when the modal window pops up.
						</li>
						<li>
							To cancel an unintentional deletion, press the
							"Cancel" button.
						</li>
						<br />
						<img src="../../assets/DeleteButton.png" alt="" />
						<br />
						<small>
							The Delete and Cancel Buttons in the Modal Window
						</small>
						<br />
						<br />
					</ol>
				</Accordion.Body>
			</Accordion.Item>
		</Accordion>
	);
}

export default Help;
