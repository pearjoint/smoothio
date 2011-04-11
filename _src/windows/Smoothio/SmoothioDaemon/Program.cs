
using System;
using System.Collections.Generic;
using System.ServiceProcess;
using System.Text;

namespace SmoothioDaemon {

	public static class Program {

		public static void Main () {
			ServiceBase.Run (new ServiceBase [] { new SmoothioDaemon () });
		}

	}

}
