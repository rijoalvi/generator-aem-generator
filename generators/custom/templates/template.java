public class <%= className %> {
   String breed;
   int age;
   String color;
   <%if (showText) { %>
	   void barking() {
		   system.out.println('<%= text %>')
	   }

	   void hungry() {
	   }

	   void sleeping() {
	   }
   <% } %>
}