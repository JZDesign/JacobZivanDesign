import kotlin.browser.document
import kotlin.browser.window
import kotlin.dom.addClass

class View {
    private val container = document.getElementById("formContainer") as _Div_

    fun create() {
        container.append(newForm())
    }

    private fun newForm() = NameAndEmail().let { form ->
        form.apply {
            firstNameInput.configureInput(INPUT, placeholder = "First Name")
            lastNameInput.configureInput(INPUT, placeholder = "Last Name")
            emailInput.configureInput(INPUT, placeholder = "Email")

            sumbit.apply {
                addClass(BUTTON)
                innerHTML = "Submit"
                addEventListener(CLICK, {
                    window.alert("This form and button were dynamically created with Kotlin\n\nYour name is: " +
                            "${firstNameInput.value} ${lastNameInput.value}\n\n and your email is: ${emailInput.value}")
                })
            }

            container.apply {
                addClass("container")
                append(firstNameInput, lastNameInput, emailInput, sumbit)
            }

        }

        form.container
    }

}
