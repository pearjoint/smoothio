
using System;
using System.Collections.Generic;
using System.Windows.Forms;

namespace SmoothioMonitor {

	public static class Program {

		[STAThread]
		public static void Main () {
			Application.EnableVisualStyles ();
			Application.SetCompatibleTextRenderingDefault (false);
			Application.Run (new MainForm ());
		}

	}

}
